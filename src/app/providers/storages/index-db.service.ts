import {Injectable} from '@angular/core';
import {fromEvent, Observable, of, race, ReplaySubject, throwError} from 'rxjs';
import {first, map, mergeMap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class IndexDbService {

  protected database: ReplaySubject<IDBDatabase>= new ReplaySubject<IDBDatabase>();
  private dbName = 'ngIndexDB';
  private storageName = 'ngObject';
  private dataPath = 'dbPath';

  constructor() {
    this.createConnect();
  }

  private createConnect() {
    const request = indexedDB.open(this.dbName);
    (fromEvent(request, 'upgradeneeded') as Observable<Event>)
      .pipe(first())
      .subscribe(event => {
        const database = (event.target as IDBRequest).result as IDBDatabase;
        if (!database.objectStoreNames.contains(this.storageName)) {
          database.createObjectStore(this.storageName);
        }
      });
    const success = fromEvent(request, 'success') as Observable<Event>;
    (race(success, this.toError(request, 'connection')) as Observable<Event>)
      .pipe(first())
      .subscribe(
        event => this.database.next((event.target as IDBRequest).result as IDBDatabase),
        error => this.database.error(error as Error));
  }


  protected transaction(mode: 'readonly' | 'readwrite' = 'readonly') {
    return this.database.pipe(map((database) => database.transaction([this.storageName], mode).objectStore(this.storageName)));
  }

  protected toSuccess(request: IDBRequest): Observable<boolean> {
    return (fromEvent(request, 'success') as Observable<Event>).pipe(map(() => true));
  }

  protected toError(request: IDBRequest, method: string): Observable<any> {
    return (fromEvent(request, 'error') as Observable<Event>)
      .pipe(mergeMap(event => throwError(new Error(`IndexedDB ${method} issue : ${request.error.message}.`))));
  }

  /**
   * Get item data by key
   *
   * @param {string} key
   * @returns {Observable<T | null>}
   */
  get<T>(key: string): Observable<T | null> {
    return this.transaction().pipe(
      map((transaction) => transaction.get(key)),
      mergeMap((request) => {
        const success = (fromEvent(request, 'success') as Observable<Event>).pipe(
          map(event => (event.target as IDBRequest).result),
          map(result => result && (this.dataPath in result) ? (result[this.dataPath] as T) : null)
        );
        return (race(success, this.toError(request, 'getter')) as Observable<T | null>).pipe(first());
      }),
      first()
    );
  }

  /**
   * Set item
   *
   * @param {string} key
   * @param {any} data
   * @returns {any}
   */
  set(key: string, data: any) {
    if (data == null) {
      return of(true);
    }
    return this.get(key)
      .pipe(
        map((existingData) => (existingData == null) ? 'add' : 'put'),
        mergeMap((method) => {
          return this.transaction('readwrite').pipe(mergeMap((transaction) => {
            let request: IDBRequest;
            switch (method) {
              case 'add':
                request = transaction.add({[this.dataPath]: data}, key);
                break;
              case 'put':
              default:
                request = transaction.put({[this.dataPath]: data}, key);
                break;
            }
            return (race(this.toSuccess(request), this.toError(request, 'setter')) as Observable<boolean>).pipe(first());
          }));
        }),
        first()
      );
  }

  /**
   * Remove item by key
   *
   * @param {string} key
   * @returns {Observable<boolean>}
   */
  remove(key: string): Observable<boolean> {
    return this.get(key).pipe(
      mergeMap((data) => {
        if (data != null) {
          return this.transaction('readwrite').pipe(mergeMap((transaction) => {
            const request = transaction.delete(key);
            return (race(this.toSuccess(request), this.toError(request, 'remover')) as Observable<boolean>)
              .pipe(first());
          }));
        }
        return of(true);
      }),
      first()
    );
  }

  /**
   * Clear all
   *
   * @returns {Observable<boolean>}
   */
  clear(): Observable<boolean> {
    return this.transaction('readwrite').pipe(
      mergeMap((transaction) => {
        const request = transaction.clear();
        return (race(this.toSuccess(request), this.toError(request, 'clearer')) as Observable<boolean>)
          .pipe(first());

      }),
      first()
    );
  }
}

import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  /**
   * Get item by key
   * @param {string} key
   * @returns {Observable<T | null>}
   */
  get<T>(key: string): Observable<T | null> {
    let item = localStorage.getItem(key);
    if (item) {
      try {
        return of(JSON.parse(item));
      } catch (e) {
        return throwError(e);
      }
    }
    return of(null);
  }

  /**
   * Set item
   * @param {string} key
   * @param data
   * @returns {Observable<boolean>}
   */
  set(key: string, data: any): Observable<boolean> {
    localStorage.setItem(key, JSON.stringify(data));
    return of(true);
  }

  /**
   * Clear all items
   * @returns {Observable<boolean>}
   */
  clear(): Observable<boolean> {
    localStorage.clear();
    return of(true);
  }

}

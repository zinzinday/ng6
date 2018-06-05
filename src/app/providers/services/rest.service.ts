import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/internal/operators';
import {Credential} from '../../models/credential';
import {Profile} from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  endpoint = 'http://localhost:3000/';

  constructor(private http: HttpClient,
              public auth: AuthService) {
  }

  protected url(path: string): string {
    return this.endpoint + path;
  }

  protected pipe<T>(observable: Observable<any>): Observable<T | null> {
    return observable.pipe(map((obj: any) => obj));
  }

  protected requestAuth<T>(method: string, path: string, options?: any): Observable<T | null> {
    const obs = this.auth.credential.pipe(mergeMap((credential: any) => {
      if (credential) {
        options = options ? options : {};
        if (!options.hasOwnProperty('headers')) {
          options.headers = {};
        }
        options.headers = Object.assign(options.headers, {
          Authorization: credential.type + ' ' + credential.accessToken
        });
        return this.http.request(method, this.url(path), options);
      } else {
        return of(null);
      }
    }));
    return this.pipe<T>(obs);
  }

  login(value: any): Observable<Credential | null> {
    return this.pipe<Credential>(this.http.post(this.url('user/authorize'), value));
  }

  me(): Observable<Profile | null> {
    return this.requestAuth<Profile>('get', 'user/me');
  }

  updateMe(value: any): Observable<Profile | null> {
    return this.requestAuth<Profile>('put', 'user', {body: value});
  }
}

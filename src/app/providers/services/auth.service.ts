import {Injectable} from '@angular/core';
import {IndexDbService} from '../storages/index-db.service';
import {Observable, of} from 'rxjs';
import {Profile} from '../../models/profile';
import {Credential} from '../../models/credential';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: IndexDbService) {
  }

  get isLogggedIn(): Observable<boolean> {
    return this.credential.pipe(map(is => !!is));
  }

  get isGuest(): Observable<boolean> {
    return this.credential.pipe(map(is => !is));
  }

  get isAdmin(): Observable<boolean> {
    return this.profile.pipe(map(profile => profile.role === 'admin'));
  }

  get credential(): Observable<Credential | null> {
    return this.storage.get<Credential>('credential');
  }

  set credential(data: Observable<Credential>) {
    this.storage.set('credential', data);
  }

  get profile(): Observable<Profile | null> {
    return this.storage.get<Profile>('profile');
  }

  set profile(data: Observable<Profile>) {
    this.storage.set('profile', data);
  }

  deauthorized() {
    this.storage.remove('credential');
    this.storage.remove('profile');
  }
}

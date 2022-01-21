import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
 
const JWT_KEY = 'myjwtstoragekey';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  apiUrl: 'https://hololifoods.dk/wp-json';

  private user = new BehaviorSubject(null);
 
  constructor(private http: HttpClient, private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.storage.get(JWT_KEY).then(data => {
        if (data) {
          this.user.next(data);
        }
      })
    })
  }
 
  signIn(username, password) {
    return this.http.post(`${this.apiUrl}/jwt-auth/v1/token`, { username, password }).pipe(
      switchMap(data => {
        return from(this.storage.set(JWT_KEY, data));
      }),
      tap(data => {
        this.user.next(data);
        console.log(this.user)
      })
    );
  }
 
  signUp(username, email, password) {
    return this.http.post(`${this.apiUrl}/wp/v2/users/register`, { username, email, password });
  }
 
  resetPassword(usernameOrEmail) {
    return this.http.post(`${this.apiUrl}/wp/v2/users/lostpassword`, { user_login: usernameOrEmail });
  }

  getCurrentUser() {
    return this.user.asObservable();
  }
 
  getUserValue() {
    return this.user.getValue();
  }
 
  logout() {
    this.storage.remove(JWT_KEY).then(() => {
      this.user.next(null);
    });
  }
}
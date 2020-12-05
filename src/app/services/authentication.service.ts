import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';
 
import { Plugins } from '@capacitor/core';
import { identifierName } from '@angular/compiler';
const { Storage } = Plugins;
 
const TOKEN_KEY = 'my-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = 'https://gaiamadservice.dk/wp-json/';
  secret = 'cs_87bc1989827871fc19c2ae6d15af63e894ec212d';
  key = 'ck_faf50963dee1b3e3cca1ab77630b6f09c6a4129e'; 

  private user = new BehaviorSubject(null);
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
 
  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
 
  login(credentials: {email, password}): Observable<any> {
    return this.http.post(`https://gaiamadservice.dk/wp-json/jwt-auth/v1/token`, {
      'username': credentials.email,
      'password': credentials.password
    }).pipe(
      map((data: any) => data),
      switchMap(data => {
        localStorage.setItem("email", data.user_email);
        from(Storage.set({key:'email', value: JSON.stringify(data.user_email)}));
        return from(Storage.set({key: TOKEN_KEY, value: data.token}));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }
  subscription() {
    const email = localStorage.getItem("email");
    return this.http.get(`${this.url}wc/v1/subscriptions?search=${email}&consumer_key=${this.key}&consumer_secret=${this.secret}`)
    }

    subdetails(id) {
      return this.http.get(`${this.url}wc/v1/subscriptions/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`)
      }
skiplevering(id, date, interval) {
  let numWeeks = interval;
  let now = new Date(date);
  now.setDate(now.getDate() + numWeeks * 7);
  return this.http.put(`${this.url}wc/v1/subscriptions/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`,
  {"next_payment_date" : now})     
}
    
    orderdetails(id) {
        return this.http.get(`${this.url}wc/v3/orders/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`,
        )
        }

  orders() {
    const email = localStorage.getItem("email");
    return this.http.get(`${this.url}wc/v3/orders?search=${email}&consumer_key=${this.key}&consumer_secret=${this.secret}`)
    }
    kunde() {
      const email = localStorage.getItem("email");
      return this.http.get(`https://gaiamadservice.dk/wc-api/v3/customers/email/${email}?consumer_key=${this.key}&consumer_secret=${this.secret}`)
      }
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    console.log('Removed')
    Storage.remove({key: 'email'});
    return Storage.remove({key: TOKEN_KEY});
  }

  getCurrentUser() {
    return this.user.asObservable();
  }
}
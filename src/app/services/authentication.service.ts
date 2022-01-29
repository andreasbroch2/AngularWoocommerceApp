import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, switchMap, catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, throwError } from "rxjs";
import { Storage } from '@capacitor/storage';

const TOKEN_KEY = "my-token";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  url = "https://hololifoods.dk/wp-json/";
  secret = "cs_87bc1989827871fc19c2ae6d15af63e894ec212d";
  key = "ck_faf50963dee1b3e3cca1ab77630b6f09c6a4129e";

  private user = new BehaviorSubject(null);
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = "";

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    let email = localStorage.getItem("email");
    if (token && token.value && email) {
      console.log("set token: ", token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { email; password }): Observable<any> {
    console.log("1");
    return this.http
      .post(`https://hololifoods.dk/wp-json/jwt-auth/v1/token`, {
        username: credentials.email,
        password: credentials.password,
      })
      .pipe(
        catchError((error) => {
          console.log("3");
          return throwError(error);
        }),
        map((data: any) => data),
        switchMap((data) => {
          console.log(data);
          localStorage.setItem("email", data.user_email);
          from(
            Storage.set({
              key: "email",
              value: JSON.stringify(data.user_email),
            })
          );
          return from(Storage.set({ key: TOKEN_KEY, value: data.token }));
        }),
        tap((_) => {
          this.isAuthenticated.next(true);
        })
      );
  }
  subscription() {
    let email = localStorage.getItem("email");
    if(email){
    return this.http.post(`${this.url}myplugin/v1/subscriptions`, {
      email: email,
    });
  }else{
    this.router.navigateByUrl("/login");
  }
  }
  subdetails(id) {
    return this.http.post(`${this.url}myplugin/v1/subscription`, {
      id: id,
    });
  }
  orderNote(id, note) {
    return this.http.post(`${this.url}myplugin/v1/order_note`, {
      id: id,
      note: note
    });
  }
  frekvens(id, interval) {
    return this.http.post(`${this.url}myplugin/v1/frekvens`, {
      id: id,
      interval: interval
    });
  }
  status(id, status) {
    return this.http.post(`${this.url}myplugin/v1/status`, {
      status: status,
      subscription: id,
    });
  }
  coupon(id, coupon) {
    return this.http.post(`${this.url}myplugin/v1/coupon`, {
      coupon: coupon,
      subscription: id,
    });
  }
  removeCoupon(id, coupon) {
    return this.http.post(`${this.url}myplugin/v1/remove-coupon`, {
      coupon: coupon,
      subscription: id,
    });
  }
  cancelReason(id, reason) {
    return this.http.post(`${this.url}myplugin/v1/cancel`, {
      reason: reason,
      "user-id": id,
    });
  }
  changeDate(date, subid) {
    return this.http.post(`${this.url}myplugin/v1/date`, {
      date: date,
      subscription: subid,
    });
  }
  changeQuantity(id, subid, quant, name) {
    return this.http.post(`${this.url}myplugin/v1/quantity`, {
      quant: quant,
      id: id,
      subscription: subid,
      name: name,
    });
  }
  removeProduct(id, subid, name) {
    return this.http.post(`${this.url}myplugin/v1/remove-product`, {
      productid: id,
      subscription: subid,
      name: name,
    });
  }
  products() {
    return this.http.get(
      `${this.url}wc/v3/products?&consumer_key=${this.key}&consumer_secret=${this.secret}&per_page=100&status=publish`
    );
  }
  categories() {
    return this.http.get(
      `${this.url}wc/v3/products/categories?&consumer_key=${this.key}&consumer_secret=${this.secret}&per_page=100&status=publish`
    );
  }
  category(id) {
    return this.http.get(
      `${this.url}wc/v3/products?&consumer_key=${this.key}&consumer_secret=${this.secret}&per_page=100&status=publish&category=${id}`
    );
  }
  hovedret() {
    return this.http.get(
      `${this.url}wc/v3/products?&consumer_key=${this.key}&consumer_secret=${this.secret}&per_page=100&status=publish&category=19`
    );
  }
  snacks() {
    return this.http.get(
      `${this.url}wc/v3/products?&consumer_key=${this.key}&consumer_secret=${this.secret}&per_page=100&status=publish&category=29`
    );
  }
  drikkevarer() {
    return this.http.get(
      `${this.url}wc/v3/products?&consumer_key=${this.key}&consumer_secret=${this.secret}&per_page=100&status=publish&category=23`
    );
  }
  familieportioner() {
    return this.http.get(
      `${this.url}wc/v3/products?&consumer_key=${this.key}&consumer_secret=${this.secret}&per_page=100&status=publish&category=4774`
    );
  }
  morgenmad() {
    return this.http.get(
      `${this.url}wc/v3/products?&consumer_key=${this.key}&consumer_secret=${this.secret}&per_page=100&status=publish&category=4646`
    );
  }
  paalaeg() {
    return this.http.get(
      `${this.url}wc/v3/products?&consumer_key=${this.key}&consumer_secret=${this.secret}&per_page=100&status=publish&category=4756`
    );
  }
  glutenfri() {
    return this.http.get(
      `${this.url}wc/v3/products?&consumer_key=${this.key}&consumer_secret=${this.secret}&per_page=100&status=publish&category=37`
    );
  }
  product(prodid) {
    return this.http.get(
      `${this.url}wc/v3/products/${prodid}?&consumer_key=${this.key}&consumer_secret=${this.secret}`
    );
  }
  addproduct(id, prodid, quant) {
    return this.http.post(`${this.url}myplugin/v1/addproduct`, {
      id: id,
      prodid: prodid,
      quant: quant
    });
  }
  addNote(id, note) {
    return this.http.post(`${this.url}myplugin/v1/note`, {
      id: id,
      note: note
    });
  }
  addAdresse(id, adresse) {
    return this.http.post(`${this.url}myplugin/v1/address`, {
      id: id,
      adresse: adresse
    });
  }
  orderdetails(id) {
    return this.http.get(
      `${this.url}wc/v3/orders/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`
    );
  }
  orders() {
    let email = localStorage.getItem("email");
    return this.http.post(`${this.url}myplugin/v1/orders`, {
      email: email,
    });
  }
  processingOrders() {
    const email = localStorage.getItem("email");
    return this.http.get(
      `${this.url}wc/v3/orders?search=${email}&status=processing&consumer_key=${this.key}&consumer_secret=${this.secret}`
    );
  }
  kode(username) {
    return this.http.get(
      `${this.url}wp/v2/users/lostpassword?user_login=${username}`
    );
  }
  kunde() {
    const email = localStorage.getItem("email");
    return this.http.get(
      `https://hololifoods.dk/wc-api/v3/customers/email/${email}?consumer_key=${this.key}&consumer_secret=${this.secret}`
    );
  }
  customer(id) {
    return this.http.get(
      `${this.url}wc/v3/customers/${id}?consumer_key=${this.key}&consumer_secret=${this.secret}`
    );
  }
  addKundeAdresse(id, adresse) {
    return this.http.put(
      `${this.url}wc/v3/customers/${id}?consumer_key=${this.key}&consumer_secret=${this.secret}`,
      { billing: adresse }
    );
  }
  addKundeTelefon(id, telefon) {
    return this.http.put(
      `${this.url}wc/v3/customers/${id}?consumer_key=${this.key}&consumer_secret=${this.secret}`,
      {
        billing: {
          phone: telefon,
        },
      }
    );
  }
  addKundeEmail(id, email) {
    return this.http.put(
      `${this.url}wc/v3/customers/${id}?consumer_key=${this.key}&consumer_secret=${this.secret}`,
      {
        billing: {
          email: email,
        },
      }
    );
  }
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    console.log("Removed");
    Storage.remove({ key: "email" });
    Storage.clear();
    return Storage.remove({ key: TOKEN_KEY });
  }

  getCurrentUser() {
    return this.user.asObservable();
  }
}

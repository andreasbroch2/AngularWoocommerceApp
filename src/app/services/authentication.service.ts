import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, switchMap, catchError } from "rxjs/operators";
import { BehaviorSubject, from, Observable, throwError } from "rxjs";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const TOKEN_KEY = "my-token";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  url = "https://gaiamadservice.dk/wp-json/";
  secret = "cs_87bc1989827871fc19c2ae6d15af63e894ec212d";
  key = "ck_faf50963dee1b3e3cca1ab77630b6f09c6a4129e";

  private user = new BehaviorSubject(null);
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = "";

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
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
      .post(`https://gaiamadservice.dk/wp-json/jwt-auth/v1/token`, {
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
          console.log("2");
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
          console.log("4");
          this.isAuthenticated.next(true);
        })
      );
  }
  subscription() {
    const email = localStorage.getItem("email");
    return this.http.get(
      `${this.url}wc/v1/subscriptions?search=${email}&consumer_key=${this.key}&consumer_secret=${this.secret}`
    );
  }

  subdetails(id) {
    return this.http.get(
      `${this.url}wc/v1/subscriptions/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`
    );
  }
  orderNote(id, note) {
    return this.http.post(
      `${this.url}wc/v1/subscriptions/${id}/notes?&consumer_key=${this.key}&consumer_secret=${this.secret}`,
      { note: note }
    );
  }
  shippingMethods() {
    return this.http.get(
      `${this.url}wc/v3/shipping_methods?&consumer_key=${this.key}&consumer_secret=${this.secret}`
    );
  }
  setShipping(id, shipping_id, pris) {
    return this.http.put(
      `${this.url}wc/v1/subscriptions/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`,
      {
        shipping_lines: [
          {
            id: shipping_id,
            total: pris,
          },
        ],
      }
    );
  }
  skiplevering(id, date, interval) {
    let numWeeks = interval;
    let now = new Date(date);
    now.setDate(now.getDate() + numWeeks * 7);
    now.setHours(now.getHours() + 2);
    let nydate = now.toISOString().replace(".000Z", "").replace("T", " ");
    return this.http.put(
      `${this.url}wc/v1/subscriptions/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`,
      { next_payment_date: nydate }
    );
  }
  frekvens(id, interval) {
    return this.http.put(
      `${this.url}wc/v1/subscriptions/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`,
      { billing_interval: interval }
    );
  }
  status(id, status) {
    return this.http.post(`${this.url}myplugin/v1/status`, {
      status: status,
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
    return this.http.put(
      `${this.url}wc/v1/subscriptions/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`,
      {
        line_items: [
          {
            product_id: prodid,
            quantity: quant,
          },
        ],
      }
    );
  }
  addNote(id, note) {
    return this.http.put(
      `${this.url}wc/v1/subscriptions/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`,
      { customer_note: note }
    );
  }
  addAdresse(id, adresse) {
    return this.http.put(
      `${this.url}wc/v1/subscriptions/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`,
      { shipping: adresse }
    );
  }
  removeproduct(id, prodid, quant) {
    return this.http.put(
      `${this.url}wc/v1/subscriptions/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`,
      {
        line_items: [
          {
            id: prodid,
            quantity: quant,
          },
        ],
      }
    );
  }
  orderdetails(id) {
    return this.http.get(
      `${this.url}wc/v3/orders/${id}?&consumer_key=${this.key}&consumer_secret=${this.secret}`
    );
  }
  orders() {
    const email = localStorage.getItem("email");
    return this.http.get(
      `${this.url}wc/v3/orders?search=${email}&consumer_key=${this.key}&consumer_secret=${this.secret}`
    );
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
      `https://gaiamadservice.dk/wc-api/v3/customers/email/${email}?consumer_key=${this.key}&consumer_secret=${this.secret}`
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

import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit, NgModule } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { ProductsPage } from "../products/products.page";
import { OversigtinfoPage } from "../oversigtinfo/oversigtinfo.page";

@Component({
  selector: "app-sub-details",
  templateUrl: "./sub-details.page.html",
  styleUrls: ["./sub-details.page.scss"],
})
export class SubDetailsPage implements OnInit {
  id = this.activatedRoute.snapshot.paramMap.get("id");
  details = null;
  date = new Date();
  response = null;
  total = null;
  load = "";
  noticeopen = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    public alertController: AlertController,
    public modalController: ModalController
  ) {}
  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  addNumbers(number1, number2) {
    const result: number = Number(number1) + Number(number2);
    return result;
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.authService.subdetails(id).subscribe((result) => {
      this.details = result;
      console.log(result);
      this.date = this.details.next_payment_date;
      this.date = this.addDays(this.date, 4);
    });
    this.authService.shippingMethods().subscribe((result) => {
      console.log(result);
    });
  }

  async presentModal() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    const modal = await this.modalController.create({
      component: ProductsPage,
      cssClass: "product-modal",
      componentProps: {
        subid: id,
      },
    });
    await modal.present();

    const eventDetails = await modal.onDidDismiss();

    if (eventDetails) {
      console.log(eventDetails.data);
      if (eventDetails.data) this.details = eventDetails.data;
    }
  }

  console() {
    console.log(this.details);
    console.log(this.date);
    console.log(this.response);
    console.log(this.details.next_payment_date);
    console.log(this.details.billing_interval);
  }
  async skip() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Er du sikker?",
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Yes!",
          handler: () => {
            let id = this.activatedRoute.snapshot.paramMap.get("id");
            this.load = "Springer over...";
            this.authService
              .skiplevering(
                id,
                this.details.next_payment_date,
                this.details.billing_interval
              )
              .subscribe((result) => {
                this.details = result;
                this.authService
                  .orderNote(
                    id,
                    "Dato ændret fra app " + this.details.next_payment_date
                  )
                  .subscribe((result) => {
                    console.log(result);
                  });
                this.date = this.details.next_payment_date;
                this.date = this.addDays(this.date, 4);
                this.load = "";
                console.log(result);
              });
          },
        },
      ],
    });

    await alert.present();
  }

  async editLineItem(prodid) {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Ændre antal eller fjern vare",
      message:
        "Skriv nyt antal og derefter Bekræft, for at ændre antal. Tryk på Fjern for at fjerne varen fra din kasse.",
      inputs: [
        {
          name: "Antal",
          type: "number",
        },
      ],
      buttons: [
        {
          text: "Fjern vare(r)",
          cssClass: "secondary",
          handler: () => {
            this.load = "Fjerner produkt...";
            this.authService
              .removeproduct(id, prodid, 0)
              .subscribe((result) => {
                this.details = result;
                this.authService
                  .orderNote(id, "Produkt fjernet - Fra app - " + prodid)
                  .subscribe((result) => {
                    console.log(result);
                  });
                let subtotal =
                  this.details.total -
                  this.details.shipping_total -
                  this.details.shipping_tax;
                if (subtotal <= 599) {
                  console.log("Ingen gratis levering");
                  this.authService
                    .setShipping(id, this.details.shipping_lines[0].id, "55.20")
                    .subscribe((result) => {
                      this.details = result;
                    });
                } else {
                  console.log("Gratis Levering");
                  this.authService
                    .setShipping(id, this.details.shipping_lines[0].id, "0.00")
                    .subscribe((result) => {
                      this.details = result;
                    });
                }
                this.load = "";
              });
          },
        },
        {
          text: "Gem ændringer",
          handler: (value) => {
            let id = this.activatedRoute.snapshot.paramMap.get("id");
            this.load = "Ændrer antal...";
            console.log(id, prodid, value.Antal);
            this.authService
              .changeQuantity(prodid, id, value.Antal)
              .subscribe((result) => {
                console.log(result);
                this.authService
                  .orderNote(
                    id,
                    "Antal ændret fra app " + prodid + value.Antal
                  )
                  .subscribe((result) => {
                    console.log(result);
                  });
                this.load = "";
                location.reload();
              });
          },
        },
      ],
    });

    await alert.present();
  }

  async frek() {
    console.log(this.details.billing_interval);
    if (this.details.billing_interval === "1") {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: "Vælg Frekvens",
        message: "Hvor ofte vil du have leveret",
        buttons: [
          {
            text: "Hver anden uge",
            handler: () => {
              this.frek2();
              console.log("2");
            },
          },
          {
            text: "Hver fjerde uge",
            handler: () => {
              this.frek4();
              console.log("4");
            },
          },
        ],
      });
      await alert.present();
    } else if (this.details.billing_interval === "2") {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: "Vælg Frekvens",
        message: "Hvor ofte vil du have leveret",
        buttons: [
          {
            text: "Hver uge",
            handler: () => {
              this.frek1();
              console.log("1");
            },
          },
          {
            text: "Hver fjerde uge",
            handler: () => {
              this.frek4();
              console.log("4");
            },
          },
        ],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: "Vælg Frekvens",
        message: "Hvor ofte vil du have leveret",
        buttons: [
          {
            text: "Hver uge",
            handler: () => {
              this.frek1();
              console.log("1");
            },
          },
          {
            text: "Hver anden uge",
            handler: () => {
              this.frek2();
              console.log("2");
            },
          },
        ],
      });
      await alert.present();
    }
  }
  frek1() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.load = "Ændrer frekvens...";
    this.authService.frekvens(id, 1).subscribe((result) => {
      this.details = result;
      this.authService
        .orderNote(id, "Interval ændret til 1 - Fra app.")
        .subscribe((result) => {
          console.log(result);
        });
      this.load = "";
      console.log(result);
    });
  }
  frek2() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.load = "Ændrer frekvens...";
    this.authService.frekvens(id, 2).subscribe((result) => {
      this.details = result;
      this.authService
        .orderNote(id, "Interval ændret til 2 - Fra app.")
        .subscribe((result) => {
          console.log(result);
        });
      this.load = "";
      console.log(result);
    });
  }
  frek4() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.load = "Ændrer frekvens...";
    this.authService.frekvens(id, 4).subscribe((result) => {
      this.details = result;
      this.authService
        .orderNote(id, "Interval ændret til 4 - Fra app.")
        .subscribe((result) => {
          console.log(result);
        });
      this.load = "";
      console.log(result);
    });
  }
  async pause() {
    const alert = await this.alertController.create({
      cssClass: "sikker",
      header: "Er du sikker?",
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Yes!",
          handler: () => {
            let id = this.activatedRoute.snapshot.paramMap.get("id");
            if (this.details.status === "active") {
              this.load = "Sætter på pause...";
              this.authService.status(id, "on-hold").subscribe((result) => {
                this.details = result;
                this.authService
                  .orderNote(id, "Sat på pause - Fra app.")
                  .subscribe((result) => {
                    console.log(result);
                  });
                this.load = "";
                console.log(result);
              });
            } else if (this.details.status === "on-hold") {
              this.load = "Aktiverer...";
              this.authService.status(id, "active").subscribe((result) => {
                this.details = result;
                this.authService
                  .orderNote(id, "Aktiveret - Fra app.")
                  .subscribe((result) => {
                    console.log(result);
                  });
                this.load = "";
                console.log(result);
              });
            }
          },
        },
      ],
    });

    await alert.present();
  }
  async afmeld() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Afmelding",
      subHeader:
        "Vi vil sætte stor pris hvis du vil fortælle os hvorfor du ønsker at afmelde, så vi kan forbedre os!",
      inputs: [
        {
          name: "reason",
          placeholder: "Årsag",
        },
      ],
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Bekræft",
          handler: (data) => {
            let id = this.activatedRoute.snapshot.paramMap.get("id");
            if (this.details.status != "cancelled") {
              this.load = "Afmelder...";
              this.authService.status(id, "cancelled").subscribe((result) => {
                this.details = result;
                this.authService
                  .orderNote(id, "Afmeldt- Fra app.")
                  .subscribe((result) => {
                    console.log(result);
                  });
                this.authService
                  .cancelReason(this.details.customer_id, data.reason)
                  .subscribe((result) => {
                    console.log(result);
                  });
                this.load = "";
                console.log(result);
              });
            } else if (this.details.status === "cancelled") {
              this.load = "Genaktiverer...";
              this.authService.status(id, "active").subscribe((result) => {
                this.details = result;
                this.authService
                  .orderNote(id, "Genaktiveret - Fra app.")
                  .subscribe((result) => {
                    console.log(result);
                  });
                this.load = "";
                console.log(result);
              });
            }
          },
        },
      ],
    });

    await alert.present();
  }
  hidden = true;
  showContent() {
    if (this.hidden) {
      document.getElementById("leveringscontent").style.display = "block";
      this.hidden = false;
    } else {
      document.getElementById("leveringscontent").style.display = "none";
      this.hidden = true;
    }
  }
  hiddenkasse = true;
  showContentKasse() {
    if (this.hiddenkasse) {
      document.getElementById("kassecontent").style.display = "block";
      this.hiddenkasse = false;
    } else {
      document.getElementById("kassecontent").style.display = "none";
      this.hiddenkasse = true;
    }
  }
  hiddenbetaling = true;
  showContentBetaling() {
    if (this.hiddenbetaling) {
      document.getElementById("betalingcontent").style.display = "block";
      this.hiddenbetaling = false;
    } else {
      document.getElementById("betalingcontent").style.display = "none";
      this.hiddenbetaling = true;
    }
  }
  async info() {
    const modal = await this.modalController.create({
      component: OversigtinfoPage,
      cssClass: "product-modal",
    });
    await modal.present();
  }

  closeNotice() {
    this.noticeopen = false;
  }
  async note() {
    const alert = await this.alertController.create({
      cssClass: "notealert",
      header: "Leveringsnote",
      inputs: [
        {
          name: "note",
          type: "textarea",
          placeholder:
            "Fortæl os hvis der er noget vi skal tage højde for ved levering(dørkode, sted mm.). Vi forsøger altid at sætte kassen ved fordøren, og alternativt et passende sted i læ.",
        },
      ],
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Bekræft",
          handler: (value) => {
            this.load = "Skifter note";
            console.log(value.note);
            let id = this.activatedRoute.snapshot.paramMap.get("id");
            this.authService.addNote(id, value.note).subscribe((result) => {
              this.details = result;
              this.authService
                .orderNote(id, "Note ændret - Fra app.")
                .subscribe((result) => {
                  console.log(result);
                });
              this.load = "";
            });
          },
        },
      ],
    });
    await alert.present();
  }
  async adresse() {
    const alert = await this.alertController.create({
      cssClass: "adressealert",
      header: "Leveringsadresse",
      inputs: [
        {
          name: "first_name",
          type: "text",
          placeholder: "Fornavn",
        },
        {
          name: "last_name",
          type: "text",
          placeholder: "Efternavn",
        },
        {
          name: "address_1",
          type: "text",
          placeholder: "Vejnavn og nr.",
        },
        {
          name: "address_2",
          type: "text",
          placeholder: "Etage, dør, mm.",
        },
        {
          name: "postcode",
          type: "text",
          placeholder: "Postnummer",
        },
        {
          name: "city",
          type: "text",
          placeholder: "By",
        },
      ],
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Bekræft",
          handler: (value) => {
            this.load = "Skifter adresse";
            console.log(value);
            let id = this.activatedRoute.snapshot.paramMap.get("id");
            this.authService.addAdresse(id, value).subscribe((result) => {
              this.details = result;
              this.authService
                .orderNote(id, "Adresse ændret - Fra app.")
                .subscribe((result) => {
                  console.log(result);
                });
              console.log(this.details);
              this.load = "";
            });
          },
        },
      ],
    });
    await alert.present();
  }
}

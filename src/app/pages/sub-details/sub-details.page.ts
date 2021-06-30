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
  sundays = [];
  saveddate = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    public alertController: AlertController,
    public modalController: ModalController
  ) { }
  saveDate(date){
    this.saveddate = date;
  }
  addToInput(element, amount) {
    var val = parseInt(element.value, 10) || 0;
    val += amount;
    if (val < 1) {
      element.value = 1;
    } else {
      element.value = val;
    }
  }
  increment() {
    this.addToInput(document.getElementById("prodquant"), 1);
  }
  decrement() {
    this.addToInput(document.getElementById("prodquant"), -1);
  }
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
      this.date = this.details.next_payment_date;
      this.date = this.addDays(this.date, 4);
    });

    var sunday = new Date()
    sunday.setDate(sunday.getDate() + 4);
    sunday.setDate(sunday.getDate() + 7 - sunday.getDay());

    for (var i = 0; i < 12; i++) {
      console.log(sunday.toLocaleString());
      this.sundays.push(new Date(sunday.getTime()));
      sunday.setDate(sunday.getDate() + 7);
    }
    console.log(this.sundays);
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

  async skip() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Er du sikker?",
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => { },
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
                    "Dato ændret fra app til - " +
                    this.details.next_payment_date
                  )
                  .subscribe((result) => {
                    console.log(result);
                  });
                this.date = this.details.next_payment_date;
                this.date = this.addDays(this.date, 4);
                this.load = "";
              });
          },
        },
      ],
    });

    await alert.present();
  }

  openEditModal(prodid, name) {
    document.getElementById("editmodal").style.display = "block";
    document.getElementById("editmodal").setAttribute("data-prodid", prodid);
    document.getElementById("productname").innerHTML = name;
    let target = document.getElementById("editmodal");
    let hideEditModal = function (event) {
      let withinBoundaries = event.composedPath().includes(target);

      if (!withinBoundaries) {
        document.removeEventListener("click", hideEditModal);
        document.getElementById("editmodal").style.display = "none";
      }
    }
    setTimeout(function () {
      document.addEventListener("click", hideEditModal);
    }, 200)
  }
  openDateModal() {
    document.getElementById("datomodal").style.display = "block";
    let target = document.getElementById("datomodal");
    let hideDateModal = function (event) {
      let withinBoundaries = event.composedPath().includes(target);

      if (!withinBoundaries) {
        document.removeEventListener("click", hideDateModal);
        document.getElementById("datomodal").style.display = "none";
      }
    }
    setTimeout(function () {
      document.addEventListener("click", hideDateModal);
    }, 200)
  }
  removeProduct() {
    console.log('remove');
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    let prodid = document.getElementById("editmodal").getAttribute("data-prodid");
    let prodname = document.getElementById("productname").innerHTML;
    this.load = "Fjerner produkt...";
    this.authService
      .removeproduct(id, prodid, 0)
      .subscribe((result) => {
        document.getElementById("editmodal").style.display = "none";
        this.details = result;
        this.authService
          .orderNote(id, "Produkt fjernet - Fra app - " + prodname)
          .subscribe((result) => { });
        let subtotal =
          this.details.total -
          this.details.shipping_total -
          this.details.shipping_tax;
        if (subtotal <= 599) {
          this.authService
            .setShipping(id, this.details.shipping_lines[0].id, "55.20")
            .subscribe((result) => {
              this.details = result;
            });
        } else {
          this.authService
            .setShipping(id, this.details.shipping_lines[0].id, "0.00")
            .subscribe((result) => {
              this.details = result;
            });
        }
        this.load = "";
      });
  }
  changeDate(){
    console.log(this.saveddate);
  }
  changeQuantity() {
    this.load = "Ændrer antal...";
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    let prodid = document.getElementById("editmodal").getAttribute("data-prodid");
    let prodname = document.getElementById("productname").innerHTML;
    var antal = (<HTMLInputElement>document.getElementById('prodquant')).value;
    this.authService
      .changeQuantity(prodid, id, antal, prodname)
      .subscribe(() => {
        this.load = "";
        location.reload();
      });
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
            },
          },
          {
            text: "Hver fjerde uge",
            handler: () => {
              this.frek4();
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
            },
          },
          {
            text: "Hver fjerde uge",
            handler: () => {
              this.frek4();
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
            },
          },
          {
            text: "Hver anden uge",
            handler: () => {
              this.frek2();
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
        .subscribe((result) => { });
      this.load = "";
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
          handler: () => { },
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

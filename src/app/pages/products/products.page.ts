import { Component, Input, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, PickerController } from "@ionic/angular";
import { catchError, map, switchMap } from "rxjs/operators";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { identifierModuleUrl } from "@angular/compiler";

@Component({
  selector: "app-products",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"],
})
export class ProductsPage implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private pickerController: PickerController,
    private router: Router,
    private modalController: ModalController
  ) {}
  details = null;
  hovedretter = null;
  snacks = null;
  drikkevarer = null;
  familieportioner = null;
  morgenmad = null;
  paalaeg = null;
  glutenfri = null;
  hideMeHoved = false;
  hideMeSnacks = false;
  hideMeDrikkevarer = false;
  hideMeFamilieportioner = false;
  hideMeMorgenmad = false;
  hideMePaalaeg = false;
  hideMeGlutenfri = false;
  load = "";
  @Input() subid: number;

  ngOnInit() {
      this.authService.hovedret().subscribe((result) => {
        this.hovedretter = result;
      })
      this.authService.snacks().subscribe((result) => {
        this.snacks = result;
      })
      this.authService.drikkevarer().subscribe((result) => {
        this.drikkevarer = result;
      })
      this.authService.familieportioner().subscribe((result) => {
        this.familieportioner = result;
      })
      this.authService.morgenmad().subscribe((result) => {
        this.morgenmad = result;
      })
      this.authService.paalaeg().subscribe((result) => {
        this.paalaeg = result;
      })
      this.authService.glutenfri().subscribe((result) => {
        this.glutenfri = result;
      })
  }
  async openPicker(prodid, prodname) {
    const picker = await this.pickerController.create({
      columns: [
        {
          name: "Antal",
          cssClass: "picker",
          options: [
            { text: "1", value: 1 },
            { text: "2", value: 2 },
            { text: "3", value: 3 },
            { text: "4", value: 4 },
            { text: "5", value: 5 },
            { text: "6", value: 6 },
            { text: "7", value: 7 },
            { text: "8", value: 8 },
            { text: "9", value: 9 },
            { text: "10", value: 10 },
          ],
        },
      ],
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
        },
        {
          text: "Tilføj",
          handler: (value) => {
            this.load = "Tilføjer vare(r)"
            this.authService
              .addproduct(this.subid, prodid, value.Antal.value)
              .subscribe((result) => {
                this.authService
                .orderNote(
                  this.subid,
                  "Vare(r) tilføjet fra app - " + value.Antal.value + "x " + prodname
                )
                .subscribe((result) => {
                  console.log(result);
                });
                this.details = result;
                let subtotal =
                  this.details.total -
                  this.details.shipping_total -
                  this.details.shipping_tax;
                if (subtotal <= 599) {
                  console.log("Ingen gratis levering");
                  this.authService
                    .setShipping(
                      this.subid,
                      this.details.shipping_lines[0].id,
                      "55.20"
                    )
                    .subscribe((result) => {
                      this.details = result;
                      console.log(this.details);
                      this.modalController.dismiss(this.details);
                    });
                } else {
                  console.log("Gratis Levering");
                  this.authService
                    .setShipping(
                      this.subid,
                      this.details.shipping_lines[0].id,
                      "0.00"
                    )
                    .subscribe((result) => {
                      this.details = result;
                      this.load = "";
                      console.log(this.details);
                      this.modalController.dismiss(this.details);
                    });
                }
              });
          },
        },
      ],
    });

    await picker.present();
  }
  hideHoved() {
    if (this.hideMeHoved == false) this.hideMeHoved = true;
    else this.hideMeHoved = false;
  }
  hideSnacks() {
    if (this.hideMeSnacks == false) this.hideMeSnacks = true;
    else this.hideMeSnacks = false;
  }
  hideDrikkevarer() {
    if (this.hideMeDrikkevarer == false) this.hideMeDrikkevarer = true;
    else this.hideMeDrikkevarer = false;
  }
  hideFamilieportioner() {
    if (this.hideMeFamilieportioner == false) this.hideMeFamilieportioner = true;
    else this.hideMeFamilieportioner = false;
  }
  hideMorgenmad() {
    if (this.hideMeMorgenmad == false) this.hideMeMorgenmad = true;
    else this.hideMeMorgenmad = false;
  }
  hidePaalaeg() {
    if (this.hideMePaalaeg == false) this.hideMePaalaeg = true;
    else this.hideMePaalaeg = false;
  }
  hideGlutenfri() {
    if (this.hideMeGlutenfri == false) this.hideMeGlutenfri = true;
    else this.hideMeGlutenfri = false;
  }
}

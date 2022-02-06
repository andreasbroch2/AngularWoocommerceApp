import { Component, Input, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, PickerController, LoadingController } from "@ionic/angular";

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
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}
  products = null;
  displayCategories = [
    {id:19, name: 'Hoved/Frokostretter'},
    {id: 4774, name: 'Familieportioner'},
    {id: 4646, name: 'Morgenmad'},
    {id: 4756, name: 'Pålæg'},
    {id: 29, name: 'Snacks/tilbehør'},
    {id: 23, name: 'Drikkevarer'},
  ]
  @Input() id: number;

  ngOnInit() {
    this.authService.products().subscribe((result) => {
      this.products = result;
      console.log(result);
    });
  }
  checkCategories(categories, category){
    var check = false;
    categories.forEach(item => {
      if(item.id == category){
        check = true;
      }
    });
    return check;
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
            this.presentLoading();
            this.authService
              .addproduct(this.id, prodid, value.Antal.value)
              .subscribe((result) => {
                this.modalController.dismiss(result);
                this.loadingController.dismiss(); 
              });
          },
        },
      ],
    });

    await picker.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Arbejder...",
      translucent: true,
    });
    return await loading.present();
  }
}

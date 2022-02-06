import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "./../services/authentication.service";
import { ModalController, LoadingController } from "@ionic/angular"

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.scss'],
})
export class EdititemComponent implements OnInit {
  @Input() id: number;
  @Input() productName: string;
  @Input() productId: number;
  @Input() quant: string;

  constructor(
    private authService: AuthenticationService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    document.getElementById("prodquant").setAttribute('value', this.quant);
  }

  removeProduct() {
    this.presentLoading();
    this.authService.removeProduct(this.productId, this.id, this.productName).subscribe((result) => {
      this.modalController.dismiss(result);
      this.loadingController.dismiss();
    });
  }
  changeQuantity() {
    this.presentLoading();
    var antal = (<HTMLInputElement>document.getElementById("prodquant")).value;
    this.authService
      .changeQuantity(this.productId, this.id, antal, this.productName)
      .subscribe((result) => {
        this.modalController.dismiss(result);
        this.loadingController.dismiss();
      });
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
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Arbejder...",
      translucent: true,
    });
    return await loading.present();
  }
}

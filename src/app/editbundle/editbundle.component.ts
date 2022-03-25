import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "./../services/authentication.service";
import { ModalController, LoadingController } from "@ionic/angular"

@Component({
  selector: 'app-editbundle',
  templateUrl: './editbundle.component.html',
  styleUrls: ['./editbundle.component.scss'],
})
export class EditbundleComponent implements OnInit {
  @Input() subid: number;
  @Input() itemid: number;
items = null
  constructor(
    private authService: AuthenticationService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.authService.bundleditems().subscribe((result) => {
      console.log(result);
      this.items = result;
      console.log(this.items)
    })
  }
  switchItem(productid){
    this.presentLoading();
    console.log(this.itemid, this.subid, productid);
    this.authService.switchItem(this.itemid, this.subid, productid).subscribe((result) => {
      this.modalController.dismiss(result);
      this.loadingController.dismiss();
      location.reload();
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Arbejder...",
      translucent: true,
    });
    return await loading.present();
  }
}

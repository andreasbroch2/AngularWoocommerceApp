import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OversigtinfoPage } from '../pages/oversigtinfo/oversigtinfo.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  information = null;
  
  constructor(private authService: AuthenticationService, private modalController: ModalController) {}
 
  addDays(date) {
    var result = new Date(date);
    result.setDate(result.getDate() + 4);
    return result;
  }
  ngOnInit(){
    this.authService.subscription().subscribe(result => {
      this.information = result;
    });
}
console(){
  console.log(this.information)
}
logout(){
  this.authService.logout();
}
async info() {
  const modal = await this.modalController.create({
    component: OversigtinfoPage,
    cssClass: 'product-modal',
  });
  await modal.present();

  }
}
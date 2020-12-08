import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { ModalPage } from './../modal/modal.page'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private authService: AuthenticationService, private activatedRoute: ActivatedRoute,  public modalController: ModalController) { }

  varer = null;

  ngOnInit() {
    this.authService.products().subscribe(result => {
      this.varer = result;
      console.log(result);
    })
  }
async presentModal(prodid) {
  console.log(prodid);
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  const modal = await this.modalController.create({
    component: ModalPage,
    cssClass: 'product-modal',
    componentProps: {
      'subid': id,
      'prodid': prodid,
    }
  });
  return await modal.present();
}
}

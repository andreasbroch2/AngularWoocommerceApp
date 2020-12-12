import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductsPage } from '../products/products.page';


@Component({
  selector: 'app-sub-details',
  templateUrl: './sub-details.page.html',
  styleUrls: ['./sub-details.page.scss'],
})
export class SubDetailsPage implements OnInit {
  id = this.activatedRoute.snapshot.paramMap.get('id');
  details = null;
  date = new Date;
  response = null;
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService, public alertController: AlertController, public modalController: ModalController) {}
  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  ngOnInit(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.subdetails(id).subscribe(result => {
      this.details = result;
      this.date = this.details.next_payment_date;
      this.date = this.addDays(this.date, 4)
    });
}
async presentModal() {
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  const modal = await this.modalController.create({
    component: ProductsPage,
    cssClass: 'product-modal',
    componentProps: {
      'subid': id,
    }
  });
  await modal.present();
  
  const eventDetails = await modal.onDidDismiss();

  if (eventDetails) {
    console.log(eventDetails)
    this.details = eventDetails.data;
  }

  }

console(){
  console.log(this.details);
  console.log(this.date);
  console.log(this.response);
  console.log(this.details.next_payment_date);
  console.log(this.details.billing_interval);
}
skip(){
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  this.authService.skiplevering(id, this.details.next_payment_date, this.details.billing_interval).subscribe(result => {
    this.details = result;
    this.date = this.details.next_payment_date;
    this.date = this.addDays(this.date, 4)
    console.log(result)
  })
}
async frek(){
  console.log(this.details.billing_interval)
  if (this.details.billing_interval === '1') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vælg Frekvens',
      message: 'Hvor ofte vil du have leveret',
      buttons: [
        {
          text: 'Hver anden uge',
          handler: () => {
            this.frek2();
            console.log('2');
          }
        }, {
          text: 'Hver fjerde uge',
          handler: () => {
            this.frek4();
            console.log('4');
          },
        }
      ]
    });
    await alert.present();
  } else if(this.details.billing_interval === '2') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vælg Frekvens',
      message: 'Hvor ofte vil du have leveret',
      buttons: [
        {
          text: 'Hver uge',
          handler: () => {
            this.frek1();
            console.log('1');
          }
        }, {
          text: 'Hver fjerde uge',
          handler: () => {
            this.frek4();
            console.log('4');
          },
        }
      ]
    });
    await alert.present();
  }
  else {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vælg Frekvens',
      message: 'Hvor ofte vil du have leveret',
      buttons: [
        {
          text: 'Hver uge',
          handler: () => {
            this.frek1();
            console.log('1');
          }
        }, {
          text: 'Hver anden uge',
          handler: () => {
            this.frek2()
            console.log('2');
          },
        }
      ]
    });
    await alert.present();
  }}
frek1(){
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  this.authService.frekvens(id, 1).subscribe(result => {
    this.details = result;
    console.log(result);
})}
frek2(){
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  this.authService.frekvens(id, 2).subscribe(result => {
    this.details = result;
    console.log(result);
})}
frek4(){
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  this.authService.frekvens(id, 4).subscribe(result => {
    this.details = result;
    console.log(result);
})}
pause(){
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  if( this.details.status === 'active'){
    this.authService.status(id, 'on-hold').subscribe(result => {
      this.details = result; 
      console.log(result);
    })
  } else if (this.details.status === 'on-hold'){
    this.authService.status(id, 'active').subscribe(result => {
      this.details = result; 
      console.log(result);
    })
  }
}
addprod(){
  let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.addproduct(id, 805, 2).subscribe(result => {
      this.details = result; 
      console.log(result);
    })
}
removeprod(prodid){
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  console.log(prodid);
    this.authService.removeproduct(id, prodid).subscribe(result => {
      this.details = result; 
      console.log(result);
    })
}
}
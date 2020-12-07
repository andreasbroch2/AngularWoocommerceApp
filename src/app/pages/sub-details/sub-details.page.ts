import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-sub-details',
  templateUrl: './sub-details.page.html',
  styleUrls: ['./sub-details.page.scss'],
})
export class SubDetailsPage implements OnInit {
  details = null;
  date = new Date;
  response = null;
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService, public alertController: AlertController) {}
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
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vælg Frekvens',
      message: 'Hvor ofte vil du have leveret',
      buttons: [
        {
          text: 'Hver anden uge',
          handler: () => {
            console.log('2');
          }
        }, {
          text: 'Hver fjerde uge',
          handler: () => {
            console.log('4');
          }
        }
      ]
    });

    await alert.present();
  }
}
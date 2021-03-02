import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  kunde=null;
  customer=null; 
  load = '';
  constructor(private authService: AuthenticationService, private router: Router, private alertController: AlertController) {};
 
  ngOnInit(){
    this.authService.kunde().subscribe(result => {
      this.customer = result; 
      console.log(this.customer.customer.id);
      this.authService.customer(this.customer.customer.id).subscribe(result => {
        this.kunde = result;
      })
      console.log(this.kunde);
    });
}
console(){
  console.log(this.kunde);
}
logout(){
  this.authService.logout();
  this.router.navigate(['/'])
}
async kundeAdresse(id){
  const alert = await this.alertController.create({
    cssClass: 'adressealert',
    header: 'Kontoadresse',
    inputs: [
      {
        name: 'first_name',
        type: 'text',
        placeholder: 'Fornavn'
      },
      {
        name: 'last_name',
        type: 'text',
        placeholder: 'Efternavn'
      },
      {
        name: 'address_1',
        type: 'text',
        placeholder: 'Vejnavn og nr.'
      },
      {
        name: 'address_2',
        type: 'text',
        placeholder: 'Etage, dør, mm.'
      },
      {
        name: 'postcode',
        type: 'text',
        placeholder: 'Postnummer'
      },
      {
        name: 'city',
        type: 'text',
        placeholder: 'By'
      },
  ],
    buttons: [
      {
        text: 'Fortryd',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Bekræft',
        handler: (value) => {
          this.load = "Skifter adresse";
          console.log(value);
          this.authService.addKundeAdresse(id, value).subscribe(result => {
            this.kunde = result;
            console.log(this.kunde);
            this.load = "";
        })
      }
}]
});
  await alert.present();
}
async kundeTelefon(id){
  const alert = await this.alertController.create({
    cssClass: 'telefonalert',
    header: 'Telefonnummer',
    inputs: [
      {
        name: 'phone',
        type: 'number',
        placeholder: 'Telefon'
      },
  ],
    buttons: [
      {
        text: 'Fortryd',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Bekræft',
        handler: (value) => {
          this.load = "Skifter nummer";
          console.log(value);
          this.authService.addKundeTelefon(id, value.phone).subscribe(result => {
            this.kunde = result;
            console.log(this.kunde);
            this.load = "";
        })
      }
}]
});
  await alert.present();
}
async kundeEmail(id){
  const alert = await this.alertController.create({
    cssClass: 'emailealert',
    header: 'Email',
    inputs: [
      {
        name: 'email',
        type: 'text',
        placeholder: 'Email'
      },
  ],
    buttons: [
      {
        text: 'Fortryd',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Bekræft',
        handler: (value) => {
          this.load = "Skifter email";
          console.log(value.email);
          this.authService.addKundeEmail(id, value.email).subscribe(result => {
            this.kunde = result;
            console.log(this.kunde);
            this.load = "";
        })
      }
}]
});
  await alert.present();
}
}
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
  constructor(private authService: AuthenticationService, private router: Router, private alertController: AlertController) {};
 
  ngOnInit(){
    this.authService.kunde().subscribe(result => {
      this.kunde = result;
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
    header: 'Leveringsadresse',
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
          console.log(value);
          this.authService.addKundeAdresse(id, value).subscribe(result => {
            this.kunde = result;
            console.log(this.kunde);
        })
      }
}]
});
  await alert.present();
}
}
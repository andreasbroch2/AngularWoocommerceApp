import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import {Router} from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  kunde=null;
  customer=null; 
  toggleStatus: any;
  constructor(private authService: AuthenticationService, private router: Router, private alertController: AlertController) {};
 
  async ngOnInit(){
    await LocalNotifications.requestPermissions();
    this.authService.kunde().subscribe(result => {
      this.customer = result; 
      this.authService.customer(this.customer.customer.id).subscribe(result => {
        this.kunde = result;
      })
    });
}
async ionViewWillEnter(){
  const { value } = await Storage.get({ key: 'notifications' });
  if(value){
  this.toggleStatus = true;
    }
}
async crazyEvent(event){
    await Storage.set({
      key: 'notifications',
      value: 'true',
    });
    var day = new Date();

var days = 7 - day.getDay() - 5;;

var nextDay = new Date(day.setDate(day.getDate() + days)); 

nextDay.setHours(19);

    if(event){
      await LocalNotifications.schedule({
        notifications:[{
          title: 'Venlig påmindelse', 
          body: 'Deadline for bestilling er i aften ved midnat',
          id: 2,
          schedule: {
            at: nextDay,
            repeats: true,
            every: "week"
          }
        }]
      })
    }else{
      await LocalNotifications.cancel({ 
        notifications: [{
          id: 2
        }]
      })
    }
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
          console.log(value);
          this.authService.addKundeTelefon(id, value.phone).subscribe(result => {
            this.kunde = result;
            console.log(this.kunde);
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
          console.log(value.email);
          this.authService.addKundeEmail(id, value.email).subscribe(result => {
            this.kunde = result;
            console.log(this.kunde);
        })
      }
}]
});
  await alert.present();
}
}
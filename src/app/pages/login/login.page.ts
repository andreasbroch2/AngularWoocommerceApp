import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private iab: InAppBrowser
  ) {}
 
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
 
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService.login(this.credentials.value).subscribe(
      result => {
        console.log('succes');
        loading.dismiss();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      },
      async error => {
        console.log('fail' + error);
        await loading.dismiss();
        const alert =  await this.alertController.create({
          header: 'Log ind mislykkedes',
          message: error.message,
          buttons: ['OK'],
        });
      await alert.present();
      }
    );
  }
 
  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }
  
  get password() {
    return this.credentials.get('password');
  }
  adgangskode(){
    const browser = this.iab.create('https://gaiamadservice.dk/kundeportal/nulstil-adgangskode/');
  }
}

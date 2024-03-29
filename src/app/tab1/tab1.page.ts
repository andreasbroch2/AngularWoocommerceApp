import { AuthenticationService } from "./../services/authentication.service";
import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { OversigtinfoPage } from "../pages/oversigtinfo/oversigtinfo.page";
import { Router } from "@angular/router";
import { add, format, parseISO } from "date-fns";
import { da } from "date-fns/locale";
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  information = null;
  orders = null;
  constructor(
    private authService: AuthenticationService,
    private modalController: ModalController,
    public router: Router,
    public elementRef: ElementRef,
  ) {}

  parseDate(isodate, days){
    return format(add(parseISO(isodate), {
      days: days
    }), "EEE 'd.' d MMM", {locale: da});
  }
  auth() {
    this.authService.subscription().subscribe((result) => {
      this.information = result;
      console.log(result);
    });
  }
  ngOnInit() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
  }
  ionViewWillEnter() {
    this.auth();
  }
  console() {
    console.log(this.information);
  }
  logout() {
    this.authService.logout();
  }
  async info() {
    const modal = await this.modalController.create({
      component: OversigtinfoPage,
      cssClass: "product-modal",
    });
    await modal.present();
  }
}

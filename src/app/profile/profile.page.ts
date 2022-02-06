import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }

  async ngOnInit() {
    await LocalNotifications.requestPermissions();
  }
  async scheduleReminder(){
    await LocalNotifications.schedule({
      notifications:[{
        title: 'Venlig påmindelse', 
        body: 'Deadline for bestilling er i aften ved midnat',
        id: 1,
      }]
    })
  }
}

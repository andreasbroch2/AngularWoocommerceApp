import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  information = null;
  
  constructor(private authService: AuthenticationService) {}
 
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
}
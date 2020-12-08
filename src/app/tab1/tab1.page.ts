import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  information = null;
  count = null;
  constructor(private authService: AuthenticationService) {}
 
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
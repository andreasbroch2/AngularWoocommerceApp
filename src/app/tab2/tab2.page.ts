import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  orders=null;
  constructor(private authService: AuthenticationService, private router: Router) {};
 
  ngOnInit(){
    this.authService.orders().subscribe(result => {
      this.orders = result;
    });
}
console(){
  console.log(this.orders);
}
logout(){
  this.authService.logout();
  this.router.navigate(['/'])
}
}

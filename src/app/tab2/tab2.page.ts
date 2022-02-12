import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { add, format, parseISO } from 'date-fns';
import { da } from 'date-fns/locale';

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
      console.log(result);
      this.orders = result;
    });
}
parseDate(isodate, days = 0){
  return format(add(parseISO(isodate), {
    days: days
  }), "EEE 'd.' d MMM", {locale: da});
}
}

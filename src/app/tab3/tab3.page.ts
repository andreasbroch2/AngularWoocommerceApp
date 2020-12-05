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
  constructor(private authService: AuthenticationService, private router: Router) {};
 
  ngOnInit(){
    this.authService.kunde().subscribe(result => {
      this.kunde = result;
    });
}
console(){
  console.log(this.kunde);
}
logout(){
  this.authService.logout();
  this.router.navigate(['/'])
}
}
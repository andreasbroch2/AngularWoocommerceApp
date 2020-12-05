import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  details = null;
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {}

  ngOnInit(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.orderdetails(id).subscribe(result => {
      this.details = result;
    });
}
console(){
  console.log(this.details);
}
}
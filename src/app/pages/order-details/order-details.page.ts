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
  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  addNumbers(number1, number2) {
    const result: number = Number(number1) + Number(number2);
    return result;
  }
  ngOnInit(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.orderdetails(id).subscribe(result => {
      this.details = result;
      console.log(this.details);
    });
}
console(){
  console.log(this.details);
}
}
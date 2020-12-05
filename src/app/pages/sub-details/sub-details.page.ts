import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-details',
  templateUrl: './sub-details.page.html',
  styleUrls: ['./sub-details.page.scss'],
})
export class SubDetailsPage implements OnInit {
  details = null;
  date = new Date;
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {}
  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  ngOnInit(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.subdetails(id).subscribe(result => {
      this.details = result;
      this.date = this.details.next_payment_date;
      this.date = this.addDays(this.date, 4)
    });
}
console(){
  console.log(this.details);
  console.log(this.date)
}
}
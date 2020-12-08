import { Component, Input, NgModule, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { SliderComponent } from './../../components/slider/slider.component';
@NgModule({
  declarations: [
    SliderComponent
  ]
})
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  product = null;

  @Input() subid: number;
  @Input() prodid: number;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.product(this.prodid).subscribe(result => {
      this.product = result;
  })
  }
}

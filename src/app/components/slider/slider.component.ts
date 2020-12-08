import { Component, NgModule, OnInit } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

@NgModule ({
  imports: [
  MatSliderModule]
})

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}

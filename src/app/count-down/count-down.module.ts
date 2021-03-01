import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CountDownComponent } from './count-down.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [ CommonModule, IonicModule],
  exports: [CountDownComponent],
  declarations: [CountDownComponent],
  providers: [],
})
export class CountDownModule {}

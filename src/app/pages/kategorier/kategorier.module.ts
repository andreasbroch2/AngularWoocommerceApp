import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KategorierPageRoutingModule } from './kategorier-routing.module';

import { KategorierPage } from './kategorier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KategorierPageRoutingModule
  ],
  declarations: [KategorierPage]
})
export class KategorierPageModule {}

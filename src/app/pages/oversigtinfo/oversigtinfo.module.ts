import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OversigtinfoPageRoutingModule } from './oversigtinfo-routing.module';

import { OversigtinfoPage } from './oversigtinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OversigtinfoPageRoutingModule
  ],
  declarations: [OversigtinfoPage]
})
export class OversigtinfoPageModule {}

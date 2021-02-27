import { ProductsPageModule } from './../products/products.module';
import { OversigtinfoPageModule } from './../oversigtinfo/oversigtinfo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubDetailsPageRoutingModule } from './sub-details-routing.module';

import { SubDetailsPage } from './sub-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubDetailsPageRoutingModule,
    OversigtinfoPageModule,
    ProductsPageModule,
  ],
  declarations: [SubDetailsPage, ]
})
export class SubDetailsPageModule {}

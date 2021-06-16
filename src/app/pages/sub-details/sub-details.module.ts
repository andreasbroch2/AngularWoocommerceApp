import { ProductsPageModule } from './../products/products.module';
import { OversigtinfoPageModule } from './../oversigtinfo/oversigtinfo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubDetailsPageRoutingModule } from './sub-details-routing.module';

import { SubDetailsPage } from './sub-details.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubDetailsPageRoutingModule,
    OversigtinfoPageModule,
    ProductsPageModule,
    FontAwesomeModule
  ],
  declarations: [SubDetailsPage, ]
})
export class SubDetailsPageModule {}

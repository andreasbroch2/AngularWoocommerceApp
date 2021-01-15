import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KategorierPage } from './kategorier.page';

const routes: Routes = [
  {
    path: '',
    component: KategorierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KategorierPageRoutingModule {}

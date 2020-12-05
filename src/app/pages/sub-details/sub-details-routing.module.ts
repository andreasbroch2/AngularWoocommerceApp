import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubDetailsPage } from './sub-details.page';

const routes: Routes = [
  {
    path: '',
    component: SubDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubDetailsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressdetailsComponent } from './customer/addressdetails.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {
    path:'customer',
    component:CustomerComponent
  },
  {
    path:'addressdetails/:id',
    component:AddressdetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

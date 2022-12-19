import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { AddnewcustomerComponent } from './pages/customer/addnewcustomer/addnewcustomer.component';
import { AddnewaddressComponent } from './pages/address/addnewaddress/addnewaddress.component';
import { AddressComponent } from './pages/address/address.component';

const routes: Routes = [
  { path: "", component: CustomerComponent, canActivate: [AuthGuard] },
  { path: "customer", component: CustomerComponent, canActivate: [AuthGuard] },
  { path: "new/customer", component: AddnewcustomerComponent, canActivate: [AuthGuard] },
  { path: "update/customer/:customerId", component: AddnewcustomerComponent, canActivate: [AuthGuard] },
  { path: "address", component: AddressComponent, canActivate: [AuthGuard] },
  { path: "address/:customerId", component: AddressComponent, canActivate: [AuthGuard] },
  { path: "new/address/:customerId", component: AddnewaddressComponent, canActivate: [AuthGuard] },
  { path: "update/address/:customerId", component: AddnewaddressComponent, canActivate: [AuthGuard] },
  { path: "**", component: PagenotfoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

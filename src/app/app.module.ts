import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './components/login-button.component';
import { LogoutButtonComponent } from './components/logout-button.component';
import { AddnewcustomerComponent } from './pages/customer/addnewcustomer/addnewcustomer.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';


import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerService } from './services/customer.service';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressComponent } from './pages/address/address.component';
import { AddnewaddressComponent } from './pages/address/addnewaddress/addnewaddress.component';
import { AddressService } from './services/address.service';
import { AddresstableComponent } from './pages/address/addnewaddress/addresstable/addresstable.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutButtonComponent,
    AuthButtonComponent,
    CustomerComponent,
    PagenotfoundComponent,
    AddnewcustomerComponent,
    AddressComponent,
    AddnewaddressComponent,
    AddresstableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzPopconfirmModule,
    FormsModule,
    NzCardModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-mskzqyu5s8bqgo3a.us.auth0.com',
      clientId: 'r4frE0FNHrgPd4EAfib9Pa56FlcNb4jX'
    }),
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [CustomerService, NzMessageService, AddressService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

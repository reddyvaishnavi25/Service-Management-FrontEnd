import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getCustomer(){
    return this.http.get<any>("http://localhost:8080/Address");
  }

  getAddressDetails(addressId:number){
    return this.http.get<any>(`http://localhost:8080/addressdetails/${addressId}`);

  }
}
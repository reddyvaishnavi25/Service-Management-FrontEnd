import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../types/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  baseURL = 'https://770erqbzo5.execute-api.us-east-2.amazonaws.com';

  getAllCustomerDetails(): Observable<any> {
    return this.http.get(`${this.baseURL}/all/customer/details`);
  }

  addNewCustomer(payload: Customer): Observable<any> {
    return this.http.post(`${this.baseURL}/add/customer`, payload);
  }

  getCustomerDetails(customerId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/customer/details?customerId=${customerId}`);
  }

  updateCustomerDetails(payload: Customer): Observable<any> {
    return this.http.put(`${this.baseURL}/update/customer`, payload);
  }

  deleteCustomerDetails(customerId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/customer/details?customerId=${customerId}`);
  }

}
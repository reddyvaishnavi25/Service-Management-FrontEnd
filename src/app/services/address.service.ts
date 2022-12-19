import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../types/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  baseURL = 'https://770erqbzo5.execute-api.us-east-2.amazonaws.com';

  getAllAddressDetails(customerId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/address/details?customerId=${customerId}`);
  }

  saveAllAddressDetails(payload: { customerId: number, addressDetails: Address[] }): Observable<any> {
    return this.http.post(`${this.baseURL}/add/address`, payload);
  }

  deleteAddressDetails(addressId: number, customerId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/one/address?customerId=${customerId}&addressId=${addressId}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/types/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private addressService: AddressService, private router: Router, private activatedRoute: ActivatedRoute,
    private message: NzMessageService) { }

  addressDetails: any[] = [];
  customerId: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(result => {
      this.customerId = result['customerId'];
      this.addressService.getAllAddressDetails(this.customerId).subscribe((response: any[]) => {
        if (response && response.length > 0) {
          const dataArr: any[] = [];
          response.forEach((rec: Address, index: number) => dataArr.push({ sno: ++index, ...rec }));
          this.addressDetails = dataArr
        }
      });
    });
  }

  confirmDelete(addressId: number, customerId: number): void {
    this.addressService.deleteAddressDetails(addressId, customerId).subscribe((response) => {
      if (response) {
        this.createMessage('success', 'Address Details Deleted Succesfully');
        this.addressService.getAllAddressDetails(customerId).subscribe((response: any[]) => {
          if (response && response.length > 0) {
            const dataArr: any[] = [];
            response.forEach((rec: Address, index: number) => dataArr.push({ sno: ++index, ...rec }));
            this.addressDetails = dataArr;
          } else {
            this.addressDetails = [];
          }
        });
      }
    })
  }

  cancelDelete(): void {
    return;
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddressService } from 'src/app/services/address.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Address } from 'src/app/types/address';
import { Customer } from 'src/app/types/customer';
@Component({
  selector: 'app-addnewaddress',
  templateUrl: './addnewaddress.component.html',
  styleUrls: ['./addnewaddress.component.css']
})
export class AddnewaddressComponent implements OnInit {

  @Input() pageTitle: string = "ADD NEW ADDRESS DETAILS";
  @Input() buttonTitle: string = "ADD ADDRESS";

  customerName: string = "";
  customerId: number = 0;
  addressDetails: Address = {
    addressId: 0,
    city: "",
    country: "",
    state: "",
    streetAddress: "",
    zip: 0,
    customerId: 0,
  };

  addedAddressDetails: Address[] = [];

  constructor(private fb: UntypedFormBuilder, private addressService: AddressService,
    private customerService: CustomerService,
    private message: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.addedAddressDetails.length >= 4) {
        this.createMessage('info', 'Maximum of 4 address allowed at a time');
        return;
      }
      this.addedAddressDetails = [...this.addedAddressDetails, { ...this.validateForm.value }];
      this.validateForm = this.fb.group({
        city: [null, [Validators.required]],
        country: [null, [Validators.required]],
        state: [null, [Validators.required]],
        streetAddress: [null, [Validators.required]],
        zip: [null, [Validators.required]],
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(result => {
      this.customerId = result['customerId'];
      this.addedAddressDetails = [];
      this.customerService.getCustomerDetails(this.customerId).subscribe((response: any) => {
        const { firstName, lastName } = response;
        this.customerName = `${firstName} ${lastName}`;
      });
    });

    this.validateForm = this.fb.group({
      city: [null, [Validators.required]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      streetAddress: [null, [Validators.required]],
      zip: [null, [Validators.required]],
    });
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  handleAddressSave(): void {
    if (this.addedAddressDetails.length > 0) {
      this.addressService.saveAllAddressDetails({ customerId: this.customerId, addressDetails: this.addedAddressDetails }).subscribe(response => {
        if (response && response.length > 0) {
          this.createMessage('success', 'Address Details Added Successfully');
          this.addedAddressDetails = [];
        }
      })
    } else {
      this.createMessage('error', 'Enter Some Address Details');
    }
  }

}

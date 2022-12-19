import { Component, Inject, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/types/customer';
import { PoweroffOutline } from '@ant-design/icons-angular/icons';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {

  customerDetails: Customer[] = [];
  email: string|undefined;

  constructor(private customerService: CustomerService, private router: Router, private message: NzMessageService,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
    this.auth?.user$.subscribe(
      (a:any) => {
        this.email = a.email
        console.log(a)});
    this.customerService.getAllCustomerDetails().subscribe((result) => {
      this.customerDetails = result;
    });
  }

  handleUpdateCustomer(customerId: number): void {
    if (customerId) {
      this.router.navigate([`/update/customer/${customerId}`]);
    }
  }

  handleAddAddress(customerId: number): void {
    if (customerId) {
      this.router.navigate([`/new/address/${customerId}`]);
    }
  }

  handleViewAddress(customerId: number): void {
    if (customerId) {
      this.router.navigate([`/address/${customerId}`]);
    }
  }

  confirmDelete(customerId: number): void {
    this.customerService.deleteCustomerDetails(customerId).subscribe((response) => {
      if (response) {
        this.createMessage('success', 'Customer & Address Details Deleted Succesfully');
        this.customerService.getAllCustomerDetails().subscribe((result) => {
          this.customerDetails = result;
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

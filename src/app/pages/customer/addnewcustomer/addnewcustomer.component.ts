import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { Customer } from 'src/app/types/customer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addnewcustomer',
  templateUrl: './addnewcustomer.component.html',
  styleUrls: ['./addnewcustomer.component.css']
})

export class AddnewcustomerComponent implements OnInit {

  @Input() pageTitle: string = "ADD NEW CUSTOMER DETAILS";
  @Input() buttonTitle: string = "ADD CUSTOMER";

  customerDetails: Customer = {
    customerId: 0,
    emailId: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  };

  constructor(private fb: UntypedFormBuilder, private customerService: CustomerService, private message: NzMessageService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {

      const URL: string = this.router.url;
      const isUpdate = URL.includes("update") ? true : false;

      if (isUpdate) {

        let customerId = 0;
        this.activatedRoute.params.subscribe(result => {
          customerId = result['customerId'];
        });

        const payload: Customer = { 'customerId': customerId, ...this.validateForm.value };

        this.customerService.updateCustomerDetails(payload).subscribe(result => {
          if (result) {
            this.createMessage('success', 'Customer Details Updated Succesfully');
            this.validateForm = this.fb.group({
              firstName: [null, [Validators.required]],
              lastName: [null, [Validators.required]],
              emailId: [null, [Validators.required]],
              phoneNumber: [null, [Validators.required]],
            });
            this.router.navigate(['/customer'])
          } else {
            this.createMessage('error', 'Customer Details Updation Failed');
          }
        });
      } else {
        this.customerService.addNewCustomer(this.validateForm.value).subscribe(result => {
          if (result) {
            this.createMessage('success', 'Customer Details Added Succesfully');
            this.validateForm = this.fb.group({
              firstName: [null, [Validators.required]],
              lastName: [null, [Validators.required]],
              emailId: [null, [Validators.required]],
              phoneNumber: [null, [Validators.required]],
            });
          } else {
            this.createMessage('error', 'Customer Details Addition Failed');
          }
        });
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  ngOnInit(): void {
    const URL: string = this.router.url;

    if (URL.includes("update")) {
      this.pageTitle = "UPDATE CUSTOMER DETAILS";
      this.buttonTitle = "UPDATE DETAILS";
      this.activatedRoute.params.subscribe(result => {
        const customerId = result['customerId'];
        this.customerService.getCustomerDetails(customerId).subscribe(response => {
          if (response) {
            this.customerDetails = response;
            this.validateForm = this.fb.group({
              firstName: [this.customerDetails.firstName],
              lastName: [this.customerDetails.lastName],
              emailId: [this.customerDetails.emailId],
              phoneNumber: [this.customerDetails.phoneNumber],
            });
          } else {
            this.createMessage('warning', 'Customer Details Not Found');
          }
        })
      })
    }

    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      emailId: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:any;

  constructor(private service:CustomerService) { }

  ngOnInit(): void {
  }

  button(){
    this.customers=this.service.getCustomer().subscribe(data=>this.customers=data);
  }

}
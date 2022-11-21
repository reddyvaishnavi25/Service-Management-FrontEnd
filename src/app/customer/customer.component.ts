import { Component, OnInit } from '@angular/core';
import { address } from 'src/address';
import { customer } from 'src/customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  add:address[]=[];
  cust:customer;

  constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.cust=new customer();
  }

  getCustomers():void{
    this.service.getCustomer().subscribe(data=>this.add=data);
  }

}
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { address } from 'src/address';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-addressdetails',
  templateUrl: './addressdetails.component.html',
  styleUrls: ['./addressdetails.component.css']
})
export class AddressdetailsComponent implements OnInit {
  id:number;
  add1:address;

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,public ser:CustomerService) { }

  ngOnInit(): void {
    let idparam=this.activatedRoute.snapshot.paramMap.get('id');
    this.id=idparam?+idparam:0;
    this.ser.getAddressDetails(this.id).subscribe(
      data=>{
        this.add1=data;
      }
    );
  }

}

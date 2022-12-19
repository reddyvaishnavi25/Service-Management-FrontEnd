import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/types/address';

@Component({
  selector: 'app-addresstable',
  templateUrl: './addresstable.component.html',
  styleUrls: ['./addresstable.component.css']
})
export class AddresstableComponent implements OnInit {

  @Input() addedAddressDetails: Address[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}

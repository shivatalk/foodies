import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendorheader',
  templateUrl: './vendorheader.component.html',
  styleUrls: ['./vendorheader.component.css']
})
export class VendorheaderComponent implements OnInit {

  vendoremail:string;
  constructor() { 
    this.vendoremail=localStorage.getItem("VendorEmailId");
  }

  ngOnInit() {
  }

}

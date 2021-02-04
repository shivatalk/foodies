import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  issession=false;
  isuser=false;
  isrestaurant=false;
  useremail="";
  constructor() { }

  ngOnInit() {

    if(localStorage.getItem("Role")==="User")
    {
      this.issession=true;
      this.isuser=true;
      this.useremail=localStorage.getItem("CustomerEmailId");
    }
    else if(localStorage.getItem("Role")==="Restaurant")
    {
      this.issession=true;
      this.isrestaurant=true;
      this.useremail=localStorage.getItem("VendorEmailId");
    }
    else{
      this.issession=false;
      this.isrestaurant=false;
      this.isuser=false;
    }


  }

}

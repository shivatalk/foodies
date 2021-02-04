import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendorsidemenu',
  templateUrl: './vendorsidemenu.component.html',
  styleUrls: ['./vendorsidemenu.component.css']
})
export class VendorsidemenuComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  logout()
  {
      localStorage.removeItem("VendorId");
      localStorage.removeItem("VendorEmailId");
      localStorage.removeItem("Role");
      this.route.navigate(['']);
  }

}

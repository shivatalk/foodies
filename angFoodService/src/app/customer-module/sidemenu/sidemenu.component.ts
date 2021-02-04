import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }


  logout()
  {
    localStorage.removeItem("CustomerId");
    localStorage.removeItem("CustomerEmailId");
    localStorage.removeItem("Role");
    localStorage.removeItem("CustomerLocation")
    this.route.navigate(['']);
  }
}

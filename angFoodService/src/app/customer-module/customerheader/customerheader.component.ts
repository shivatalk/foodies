import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customerheader',
  templateUrl: './customerheader.component.html',
  styleUrls: ['./customerheader.component.css']
})
export class CustomerheaderComponent implements OnInit {

  useremail:string;
  constructor() { 
    this.useremail=localStorage.getItem("CustomerEmailId");
  }

  ngOnInit() {
  }

}

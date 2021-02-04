import { Component, OnInit } from '@angular/core';
import { MyfoodiesapiService } from 'src/app/apiservice/myfoodiesapi.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  orderinfo:any;
  customerid:number;
  constructor(private service:MyfoodiesapiService) { 
    this.customerid=<number>(<any>localStorage.getItem("CustomerId")); //get value from local storage
  }

  ngOnInit() {

    let ob=this.service.GetCustomerOrders(this.customerid);
    ob.subscribe((data)=>{this.orderinfo=data},(err)=>{console.log(err)});

  }

}

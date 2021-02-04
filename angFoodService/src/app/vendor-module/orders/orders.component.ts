import { Component, OnInit } from '@angular/core';
import { MyfoodiesapiService } from 'src/app/apiservice/myfoodiesapi.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderinfo:any;
  vendorid:number;
  constructor(private service:MyfoodiesapiService) { 
    this.vendorid=<number>(<any>localStorage.getItem("VendorId"));
  }

  ngOnInit() {

    let ob=this.service.GetVendorOrders(this.vendorid);
    ob.subscribe((data)=>{this.orderinfo=data},(err)=>{console.log(err)});

  }
}

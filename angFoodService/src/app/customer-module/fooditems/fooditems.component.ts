import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyfoodiesapiService } from 'src/app/apiservice/myfoodiesapi.service';

@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.component.html',
  styleUrls: ['./fooditems.component.css']
})
export class FooditemsComponent implements OnInit {

  items=[1]
  constructor(private service:MyfoodiesapiService,private route:Router) { }

  ngOnInit() {

    let ob=this.service.GetCustomerMenuItems();
    ob.subscribe((data)=>{this.items=data},(err)=>{console.log(err)});
  }

  OrderNow(orderitem:any)
  {
      let ob=this.service.SetOrderData(orderitem);

      ob.subscribe((data)=>{
        this.route.navigate(['Customer/ordernow']);
      });
    
     
  }

}

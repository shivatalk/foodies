import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyfoodiesapiService } from 'src/app/apiservice/myfoodiesapi.service';

@Component({
  selector: 'app-ordernow',
  templateUrl: './ordernow.component.html',
  styleUrls: ['./ordernow.component.css']
})
export class OrdernowComponent implements OnInit {

  orderitem:any;
  quantity:number=1;
  constructor(private service:MyfoodiesapiService,private route:Router) { 

    let d=this.service.GetOrderData();
    d.subscribe((data)=>{
      this.orderitem=data;
  
    });
    
  }

  ngOnInit() {

  }

  Plus()
  {
      this.quantity+=1;
  }
  Minus()
  {
    if(this.quantity<=1)
        this.quantity=1;
    else
    this.quantity-=1;
  }

  PlaceOrder(data:any)
  {

    let obj={

      CustomerId:localStorage.getItem("CustomerId"), //will come from session or local storage
      FoodItemId:data.FoodId,
      VendorId:data.VendorId,

      OrderLocation:localStorage.getItem("CustomerLocation"), // will come from local storage
      OrderQuantity:this.quantity,
      OrderAmount:data.FoodPrice*this.quantity,
      OrderStatus:"Pending",
      OrderComments:"Done..",
      //Order Time and Order date Is remaining
      OrderDate:new Date(),
      OrderTime:new Date()

    }

    
    console.log(localStorage.getItem("CustomerLocation"));
    console.log(obj);

   this.service.SetFinalOrderData(obj).subscribe((data)=>{
    this.route.navigate(['Customer/payment']);
   },(err)=>{console.log(err)});

  }
 

}

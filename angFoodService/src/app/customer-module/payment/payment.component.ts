import { Component, OnInit } from '@angular/core';
import { MyfoodiesapiService } from 'src/app/apiservice/myfoodiesapi.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  ispay=false;
  issuccess=false;
  orderDetail:any;

  constructor(private service:MyfoodiesapiService,private datepipe:DatePipe,private route:Router) { }

  ngOnInit() {
  }

  Paynow()
  {
      this.ispay=true;
      this.service.Payment().subscribe((data)=>{
        this.issuccess=true;
        this.ispay=false;
        //cureent date and time --->obj order
        this.service.GetFinalOrderData().subscribe((data)=>{
          this.orderDetail=data;
          this.orderDetail.OrderDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
          this.orderDetail.OrderTime=this.datepipe.transform(new Date(), 'h:mm:ss'); 
          // orderr api  
          console.log(this.orderDetail);
          this.service.PlaceCustomerOrder(this.orderDetail)
          .subscribe((data)=>{
          
            setTimeout(() => {
                this.route.navigate(['Customer/orderonline']);
            }, 2000);
          },(err)=>{console.log(err)});

        },(err)=>{console.log(err)});

        // orderr api
        //subscribe --->
      },(err)=>{console.log("Error in Payment")});
  }


}

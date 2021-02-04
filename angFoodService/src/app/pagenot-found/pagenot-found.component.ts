import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MyfoodiesapiService } from '../apiservice/myfoodiesapi.service';

@Component({
  selector: 'app-pagenot-found',
  templateUrl: './pagenot-found.component.html',
  styleUrls: ['./pagenot-found.component.css']
})
export class PagenotFoundComponent implements OnInit {

  ispay=false;
  issuccess=false;
  orderDetail: any;

  constructor(private service:MyfoodiesapiService,private datepipe:DatePipe) { }

  ngOnInit() {
  }

  pay()
  {
      this.ispay=true;
      this.service.Payment().subscribe((data)=>{
        this.issuccess=true;
        this.ispay=false;

        this.service.GetFinalOrderData().subscribe((data)=>{

          console.log(data);
          this.orderDetail=data;
          this.orderDetail.OrderDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
          this.orderDetail.OrderTime=this.datepipe.transform(new Date(), 'h:mm:ss a');
          // orderr api

          console.log(this.orderDetail);

        },(err)=>{console.log(err)});

      },(err)=>{console.log("Error in Payment")});
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  

}

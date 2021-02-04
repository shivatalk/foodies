import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyfoodiesapiService } from 'src/app/apiservice/myfoodiesapi.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  userinfo:any;
  customerid:number;
  isEdit=false;
  isUpdated=false;
  CustomerForm:FormGroup;


  constructor(private service:MyfoodiesapiService,private fb:FormBuilder) {
    this.customerid=<number>(<any>localStorage.getItem("CustomerId"));
   }

  ngOnInit() {
    this.initForm();
   let ob= this.service.GetCustomerProfile(this.customerid);
   ob.subscribe((data)=>{ this.userinfo=data,(err)=>{console.log("Some error in fetching User")}});

  }
  
  Edit(vendorData:any)
  {
    this.isEdit=true;
    this.initCustomerForm(vendorData);
   
  }

  CancelUpdate()
  {
    this.isEdit=false;
  }

  initCustomerForm(vendorData:any)
  {
    this.CustomerForm=this.fb.group({

      CustomerName:[vendorData.CustomerName,Validators.required], 
      CustomerEmailId:[vendorData.CustomerEmailId,Validators.required],
      CustomerAddress:[vendorData.CustomerAddress,Validators.required],
      CustomerLocation:[vendorData.CustomerLocation,Validators.required],
      CustomerMobileNo:[vendorData.CustomerMobileNo,Validators.required],

    });


  }


  initForm()
  {
    this.CustomerForm=this.fb.group({

      CustomerName:['',Validators.required], 
      CustomerEmailId:['',Validators.required],
      CustomerAddress:['',Validators.required],
      CustomerLocation:['',Validators.required],
      CustomerMobileNo:['',Validators.required],

    });
  }

  SubmitCustomer()
  {
   
    let customerdata=this.CustomerForm.value;
    customerdata.CustomerId=this.customerid;
  
    console.log(customerdata);//modify api call
      this.service.UpdateCustomer(customerdata).subscribe((data)=>{

        this.isUpdated=true;
        setTimeout(() => { 
          this.isUpdated=false;
          this.isEdit=false;
        }, 3000);

      },(err)=>{console.log(err)});


  }


}

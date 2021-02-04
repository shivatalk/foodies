import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyfoodiesapiService } from 'src/app/apiservice/myfoodiesapi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userinfo:any;
  vendorid:number;
  isEdit=false;
  isUpdated=false;
  VendorForm:FormGroup;

  constructor(private service:MyfoodiesapiService,private fb:FormBuilder) { 
    this.vendorid=<number>(<any>localStorage.getItem("VendorId"));
  }

  ngOnInit() {
  

    this.initForm();
   let ob= this.service.GetVendorProfile(this.vendorid);
   ob.subscribe((data)=>{ this.userinfo=data,(err)=>{console.log("Some error in fetching Vendor")}});
  }


  Edit(vendorData:any)
  {
    this.isEdit=true;
    this.initVendorForm(vendorData);
   
  }

  CancelUpdate()
  {
    this.isEdit=false;
  }

  initVendorForm(vendorData:any)
  {
    this.VendorForm=this.fb.group({

      VenderName:[vendorData.VenderName,Validators.required],
      RestaurantName:[vendorData.RestaurantName,Validators.required],
      VendorEmailId:[vendorData.VendorEmailId,Validators.required],
      VendorAddress:[vendorData.VendorAddress,Validators.required],
      VendorLocation:[vendorData.VendorLocation,Validators.required],
      VendorMobileNo:[vendorData.VendorMobileNo,Validators.required],

    });


  }


  initForm()
  {
    this.VendorForm=this.fb.group({

      VenderName:['',Validators.required],
      RestaurantName:['',Validators.required],
      VendorEmailId:['',Validators.required],
      VendorAddress:['',Validators.required],
      VendorLocation:['',Validators.required],
      VendorMobileNo:['',Validators.required],

    });
  }

  SubmitVendor()
  {
   
    let vendordata=this.VendorForm.value;
    vendordata.VendorId=this.vendorid;
  
    console.log(vendordata);
      this.service.UpdateVendor(vendordata).subscribe((data)=>{

        this.isUpdated=true;
        setTimeout(() => { 
          this.isUpdated=false;
          this.isEdit=false;
        }, 3000);

      },(err)=>{console.log(err)});


  }


}

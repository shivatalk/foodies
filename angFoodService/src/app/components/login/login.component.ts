import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyfoodiesapiService } from 'src/app/apiservice/myfoodiesapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  userRole:string;
  invalidCredential:Boolean=false;

  constructor(private fb:FormBuilder,private service:MyfoodiesapiService,private route:Router) {

    this.initForm();
   }

  ngOnInit() {

  this.userRole="User";

  }

  Change(role:string)
  {
    if(role==="Restaurant")
      this.userRole="Restaurant";
    else
      this.userRole="User";
  }


  initForm()
  {
    this.loginForm=this.fb.group({
         
      EmailId:['',Validators.required],
      Password:['',Validators.required]

    });

  }

  SubmitLoginForm()
  {
    
     
      if(this.userRole=="Restaurant")
      {
        let vendor={
          VendorEmailId:this.loginForm.value.EmailId,
          VendorPassword:this.loginForm.value.Password
        }
        this.vendorLoginmethod(vendor);
      } 
      else
      {
        let user={
          CustomerEmailId:this.loginForm.value.EmailId,
          CustomerPassword:this.loginForm.value.Password
        }
        this.customerLoginmethod(user);
      } 
  }

  customerLoginmethod(credential:any)
  {
      this.service.CustomerLogin(credential).subscribe((data)=>{

        if(data.CustomerLocation==null)
          data.CustomerLocation="Not Available";

        if(data!=null)
        {
        
          localStorage.setItem("CustomerId",data.CustomerId);
          localStorage.setItem("CustomerEmailId",data.CustomerEmailId);
          localStorage.setItem("Role","User");
          localStorage.setItem("CustomerLocation",data.CustomerLocation);
          this.route.navigate(['Customer']);
        }
        else{
          this.invalidCredential=true;
          setTimeout(() => {
            this.invalidCredential=false;
          }, 3000);
          this.route.navigate(['login']);
        }

      },()=>{ console.log("Error Occured")});
  }

  vendorLoginmethod(credential:any)
  {

    this.service.VendorLogin(credential).subscribe((data)=>{

      if(data!=null)
      {
        console.log(data);
        localStorage.setItem("VendorId",data.VendorId);
        localStorage.setItem("VendorEmailId",data.VendorEmailId);
        localStorage.setItem("Role","Restaurant");
        this.route.navigate(['Vendor']);
      }
      else{
        this.invalidCredential=true;

        setTimeout(() => {
          this.invalidCredential=false;
        }, 3000);
        this.route.navigate(['login']);
      }

    },()=>{ console.log("Error Occured")});

  }



}

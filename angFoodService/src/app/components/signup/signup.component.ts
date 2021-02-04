import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyfoodiesapiService } from 'src/app/apiservice/myfoodiesapi.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isrest:boolean=false;
  signupForm:FormGroup;
  registered=false;

  constructor(private fb:FormBuilder,private service:MyfoodiesapiService) { }

  ngOnInit() {
    this.initForm();
  }

  Change(role:string)
  {
    if(role==="Restaurant")
      this.isrest=true;
    else
      this.isrest=false;
  }

  initForm()
  {
    this.signupForm=this.fb.group({

      FullName:['',Validators.required],
      EmailId:['',Validators.required],
      MobileNo:['',Validators.required],
      RestaurantName:[''],
      Role:[''],
      Password:['',Validators.required],
      ConfirmPassword:['',Validators.required],

    });

  }

  SubmitForm()
  {
   
    let formdata=this.signupForm.value;
    const role=formdata.Role;

    
    if(role==="Restaurant")
    {
      const user={
        VendorName:formdata.FullName,
        VendorEmailId:formdata.EmailId,
        VendorPassword:formdata.Password,
        VendorMobileNo:formdata.MobileNo,
        RestaurantName:formdata.RestaurantName

        }
        console.log(user) //api call here 
        this.service.RegisterVendor(user).subscribe((data)=>{
          if(data)
          {
              this.registered=true;
              setTimeout(() => {
                this.registered=false;
              }, 3000);
              this.initForm();
          }
          else{
            this.registered=false;
          }

        },(err)=>{console.log("Error Occured in Vendor Registraion")});
       

    }
    else{

      const user={
        CustomerName:formdata.FullName,
        CustomerEmailId:formdata.EmailId,
        CustomerPassword:formdata.Password,
        CustomerMobileNo:formdata.MobileNo,

      }
      
    
      console.log(user) //api call here 
      this.service.RegisterCustomer(user).subscribe((data)=>{

        if(data)
        {
            this.registered=true;
            setTimeout(() => {
              this.registered=false;
            }, 3000);
            this.initForm();
        }
        else{
          this.registered=false;
        }
        
      },(err)=>{console.log("Error Occured in Customer Registraion")});

    }



  }


}

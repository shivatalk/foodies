import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  VendorForm:FormGroup;
  inserted=false;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.initVendorForm();
  }

  initVendorForm()
  {
    this.VendorForm=this.fb.group({

      VendorName:['',Validators.required],
      RestaurantName:['',Validators.required],
      VendorEmailId:['shiva@gmail.com',Validators.required],
      VendorAddress:['',Validators.required],
      VendorLocation:['',Validators.required],
      VendorMobileNo:['',Validators.required],

    });


  }

  SubmitVendor()
  {
    console.log(this.VendorForm.value)
  
  }

}

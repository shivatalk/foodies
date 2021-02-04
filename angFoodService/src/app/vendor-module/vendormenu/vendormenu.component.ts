import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyfoodiesapiService } from 'src/app/apiservice/myfoodiesapi.service';

@Component({
  selector: 'app-vendormenu',
  templateUrl: './vendormenu.component.html',
  styleUrls: ['./vendormenu.component.css']
})
export class VendormenuComponent implements OnInit {

  items=[1]
  vendorid:number;

  MenuInputForm:FormGroup;
  inserted=false;
  clkadd=false;
  clkedit=false;
  edititem:any;
  Updated=false;
  isdeleted: boolean=false;

  constructor(private service:MyfoodiesapiService,private fb:FormBuilder) {
    this.vendorid=<number>(<any>localStorage.getItem("VendorId"));
   }

  ngOnInit() {
    this.initMenuForm();
    let ob=this.service.GetVendorMenuItems(this.vendorid);
    ob.subscribe((data)=>{this.items=data},(err)=>{console.log(err)});
  }


  initMenuForm()
  {
    this.MenuInputForm=this.fb.group({

      FoodName:['',Validators.required],
      FoodPrice:['',Validators.required],
      FoodStatus:['Available',Validators.required],
      FoodRating:['5',Validators.required],
      FoodDetails:['',Validators.required],

    });


  }

  SubmitMenu()
  {
    
    let menudata=this.MenuInputForm.value;
    menudata.VendorId=this.vendorid;
    console.log(menudata)
    this.initMenuForm();
    
    this.service.AddMenuItem(menudata).subscribe((data)=>{

      this.inserted=true;

      setTimeout(() => {
        this.inserted=false;
        this.clkadd=false;
    
      }, 3000);

    },(err)=>{
      console.log(err)
    });
  
  }

  Adding()
  {
    this.clkadd=true;
  }
  CancelAdd()
  {
    this.clkadd=false;
  }

  Editing(itemdata:any)
  {
      this.clkedit=true;
      this.PopulateForm(itemdata);
      this.edititem=itemdata;
    
  }
  CancelUpdate()
  {
    this.clkedit=false;
  }

  Deleting(foodid:number)
  {
    console.log(foodid);
     this.service.DeleteMenuItem(foodid).subscribe((data)=>{
      this.isdeleted=true;
      
      setTimeout(() => {
        this.isdeleted=false;
      }, 3000);

     },(err)=>{console.log(err)});
  }

  PopulateForm(itemdata:any)
  {
    this.MenuInputForm=this.fb.group({

      FoodName:[itemdata.FoodName,Validators.required],
      FoodPrice:[itemdata.FoodPrice,Validators.required],
      FoodStatus:[itemdata.FoodStatus,Validators.required],
      FoodRating:[itemdata.FoodRating,Validators.required],
      FoodDetails:[itemdata.FoodDetails,Validators.required],

    });
  }

  SubmitMenuUpdate()
  {

    let menudata=this.MenuInputForm.value;
    menudata.FoodId=this.edititem.FoodId;
    menudata.VendorId=this.vendorid;


    this.service.UpdateMenuItem(menudata).subscribe((data)=>{

      this.Updated=true;

      setTimeout(() => {
        this.Updated=false;
        this.clkedit=false;
    
      }, 3000);

    },(err)=>{console.log(err)});

  }



}

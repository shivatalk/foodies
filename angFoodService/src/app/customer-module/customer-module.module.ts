import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerModuleRoutingModule } from './customer-module-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { CustomerheaderComponent } from './customerheader/customerheader.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FooditemsComponent } from './fooditems/fooditems.component';
import { MyfoodiesapiService } from '../apiservice/myfoodiesapi.service';
import { OrdernowComponent } from './ordernow/ordernow.component';
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashbordComponent,
    MyordersComponent,
    MyprofileComponent,
    CustomerheaderComponent,
    SidemenuComponent,
    FooditemsComponent,
    OrdernowComponent,
    PaymentComponent
  ],

  imports: [
    CommonModule,
    CustomerModuleRoutingModule,
    ReactiveFormsModule
  ],

  providers:[MyfoodiesapiService]
  
})

export class CustomerModuleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorModuleRoutingModule } from './vendor-module-routing.module';
import { VendorheaderComponent } from './vendorheader/vendorheader.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuitemsComponent } from './menuitems/menuitems.component';
import { OrdersComponent } from './orders/orders.component';
import { MyfoodiesapiService } from '../apiservice/myfoodiesapi.service';
import { VendormenuComponent } from './vendormenu/vendormenu.component';
import { VendorsidemenuComponent } from './vendorsidemenu/vendorsidemenu.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VendorheaderComponent,
    ProfileComponent, 
    MenuitemsComponent, 
    OrdersComponent, 
    VendormenuComponent,
    VendorsidemenuComponent

    ],
    
  imports: [
    CommonModule,
    VendorModuleRoutingModule,
    ReactiveFormsModule
  ],

  providers:[MyfoodiesapiService]

})
export class VendorModuleModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuitemsComponent } from './menuitems/menuitems.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [

  {path:'profile',component:ProfileComponent},
  {path:'orders',component:OrdersComponent},
  {path:'menuitems',component:MenuitemsComponent},
  {path:'',component:MenuitemsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorModuleRoutingModule { }

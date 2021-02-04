import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { OrdernowComponent } from './ordernow/ordernow.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [

  {path:'profile',component:MyprofileComponent},
  {path:'orders',component:MyordersComponent},
  {path:'orderonline',component:DashbordComponent},
  {path:'ordernow',component:OrdernowComponent},
  {path:'payment',component:PaymentComponent},
  {path:'',component:DashbordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerModuleRoutingModule { }

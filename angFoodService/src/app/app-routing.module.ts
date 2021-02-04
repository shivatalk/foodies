import { NgModule } from '@angular/core';
import { Routes, RouterModule ,CanActivate} from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ServicePageComponent } from './components/service-page/service-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { CustomerauthGuard } from './Guards/customerauth.guard';
import { VendorauthGuard } from './Guards/vendorauth.guard';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';


const routes: Routes = [

  
  {path:'login' ,component:LoginComponent},
  {path:'signup' ,component:SignupComponent},
  {path:'About' ,component:AboutComponent},
  {path:'Services' ,component:ServicePageComponent},
  {path:'Customer' ,canActivate:[CustomerauthGuard],loadChildren: () => import('./customer-module/customer-module.module').then(m => m.CustomerModuleModule)},
  {path:'Vendor' ,canActivate:[VendorauthGuard],loadChildren: () => import('./vendor-module/vendor-module.module').then(m => m.VendorModuleModule)},
  {path:'' ,component:HomeComponent},
  {path:'**' ,component:PagenotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

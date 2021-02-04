import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule,FormsModule } from '@angular/forms'
import { MyfoodiesapiService } from './apiservice/myfoodiesapi.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ServicePageComponent } from './components/service-page/service-page.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PagenotFoundComponent,
    ServicePageComponent,
    AboutComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [MyfoodiesapiService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MyfoodiesapiService {

  baseurl="https://localhost:44312/api/";

  private orderitemdata:any;

  private FinalOrder:any;

  constructor(private http:HttpClient) { }

  GetCustomerProfile(customerId:number):Observable<any>
  {
      return this.http.get<any>(this.baseurl + "Customer/" + customerId);
  }

  GetCustomerOrders(customerId:number):Observable<any>
  {
      return this.http.get<any>(this.baseurl + "Customer/Orders/" + customerId);
  }

  GetCustomerMenuItems():Observable<any>
  {
    return this.http.get<any>(this.baseurl + "Customer/MenuItems/");
  }

  RegisterCustomer(CustomerData:any):Observable<any>
  {
    return this.http.post<any>(this.baseurl+"Customer/",CustomerData);
  }

  UpdateCustomer(Customerdata:any):Observable<any>
  {
    return this.http.put<any>(this.baseurl+"Customer/"+Customerdata.CustomerId,Customerdata);
  }

  //---------------------------------------------------------------------------------------------------------
  // Vendor Service Methods Here

  GetVendorProfile(vendorId:number):Observable<any>
  {
      return this.http.get<any>(this.baseurl + "Vendor/" + vendorId);
  }

  GetVendorOrders(vendorId:number):Observable<any>
  {
      return this.http.get<any>(this.baseurl + "Vendor/Orders/" + vendorId);
  }

  GetVendorMenuItems(vendorId:number):Observable<any>
  {
    return this.http.get<any>(this.baseurl + "Vendor/Menu/"+vendorId);
  }


  RegisterVendor(VendorData:any):Observable<any>
  {
    return this.http.post<any>(this.baseurl+"Vendor/",VendorData);
  }

  UpdateVendor(Vendordata:any):Observable<any>
  {
    return this.http.put<any>(this.baseurl+"Vendor/"+Vendordata.VendorId,Vendordata);
  }

  AddMenuItem(foodItem:any):Observable<any>
  {
    return this.http.post<any>(this.baseurl+"Vendor/addFood",foodItem);
  }

  UpdateMenuItem(itemdata:any):Observable<any>
  {
    return this.http.put<any>(this.baseurl+"Vendor/updateFood/"+itemdata.FoodId,itemdata);
  }

  DeleteMenuItem(foodid:number):Observable<any>
  {
    return this.http.delete<any>(this.baseurl+"Vendor/"+foodid);
  }

  //---------------------------------------------------------------------------------
  // order related methods here

  SetOrderData(data:any):Observable<any>
  {
    this.orderitemdata=data;
    return of("done");
  }

  GetOrderData():Observable<any>
  {
   return of(this.orderitemdata);
  }

  SetFinalOrderData(data:any):Observable<any>
  {
    this.FinalOrder=data;
    return of("done");
  }

  GetFinalOrderData():Observable<any>
  {
   return of(this.FinalOrder);
  }

  PlaceCustomerOrder(orderdata:any):Observable<any>
  {
   return this.http.post<any>(this.baseurl+"Customer/placeorder",orderdata);
  }


//----------------------------------------------------------------------------------------
// Login and Register Methoods

CustomerLogin(credential:any):Observable<any>
{
  localStorage.clear();
 return this.http.post<any>(this.baseurl+"Customer/login",credential);
}


VendorLogin(credential:any):Observable<any>
{
  localStorage.clear();
 return this.http.post<any>(this.baseurl+"Vendor/login",credential);
}

//-------------------------------------------------------------------------

Payment():Observable<any>
{
  return of('dummy').pipe(delay(4000));
}


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProducts():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  getProductDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

getAllBrands():Observable<any>{
  return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
}


  getUserOrders(userId:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }

}

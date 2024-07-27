import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0);
 
    //*==> add to cart
  addToCart(productId:string):Observable<any>{
   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      {productId: productId}
      )

  }
    //*==> display cart
  getUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
   
  }

  //*==> remove product from cart
  RemoveProduct(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`)
  }

  //*==> update Cart Product
  updateCartProduct(productId:string , newCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {count:newCount} ,
      
     
    )
  }

   //*==> checkout

   checkOut(cartId:string , userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {shippingAddress:userData}
    
    )}

    //*=> clear user cart
    clearUserCart():Observable<any>{
      return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
    }

  


   





}

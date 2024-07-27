import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor( private _HttpClient:HttpClient) { }

  //*=> add product to wishlist
  addProductToWishlist(productId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {productId:productId}
    )
  }

  //*=> display user wishlist
  getUserWishList():Observable<any>{
   return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }

  //*=> remove from wish list

  removeFromWishlist(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`)
  }


}

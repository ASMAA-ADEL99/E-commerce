import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _EcomdataService:EcomdataService,
     private _CartService:CartService,
     private _ToastrService:ToastrService,
    private _WishlistService:WishlistService){ };

  products:Product[]=[];
  searchTerm:string='';
  ngOnInit():void{
  //*==> get all products
  this._EcomdataService.getAllProducts().subscribe({
    next:(Response)=>{
      console.log(Response.data);
     this.products=Response.data;
      
    }
  });
  };

  //*==> add to cart
     addToCart(productId:string):void{
      this._CartService.addToCart(productId).subscribe({
        next:(Response)=>{
          console.log(Response);
          this._CartService.cartNumber.next(Response.numOfCartItems);
          this._ToastrService.success(Response.message , 'Fresh Cart'); 
        },
        error:(err)=>{
          console.log(err);
        }
      })
    };

 //*=> add product to wishlist
  wishListData:string[]=[];
 addToWishList(id:string):void{
  this._WishlistService.addProductToWishlist(id).subscribe({
    next:(Response)=>{
      console.log(Response);
      this._ToastrService.success(Response.message , 'wish list') ;
      this.wishListData=Response.data
    }
  })
 };

  //*=> remove product from wishlist
  wishlistProducts:any[]=[];
  remove(productId:string){
   this._WishlistService.removeFromWishlist(productId).subscribe({
     next:(Response)=>{
       console.log(Response);
       //for remove from html also
       this.wishlistProducts=Response.data
       this._ToastrService.success(Response.message , 'wish list') 
     }
   })
 
  }







}

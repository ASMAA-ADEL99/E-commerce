import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from './../../shared/services/ecomdata.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { error } from '@rxweb/reactive-form-validators';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private  _EcomdataService:EcomdataService, 
    private _CartService:CartService,
    private _ToastrService:ToastrService ,
    private _WishlistService:WishlistService){}
  
  products:Product[]=[];

  categories:any[]=[];

  searchTerm:string='';

//&categoriesSlider
  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['previous', 'next'],
    autoplay:true,
    //item:[5] => 5 items in all screens
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

//&mainSlider
mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    //item:[5] => 5 items in all screens
    items:1,
    nav: false,
  }
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

 ngOnInit():void{
  //*==> get all products
  this._EcomdataService.getAllProducts().subscribe({
    next:(Response)=>{
      console.log(Response.data);
     this.products=Response.data;
      
    }
  });

  //*=> get all categories
  this._EcomdataService.getAllCategories().subscribe({
    next:(Response)=>{
      console.log(Response.data);
      this.categories=Response.data;  
    }

  });

  //*=> wishlist products
  this._WishlistService.getUserWishList().subscribe({
    next:(Response)=>{
     // console.log('wishlist' , Response.data);  //data ---> [{id}, {id}, {id},]
    //[item._id, item._id, item._id,]
     const newData = Response.data.map((item:any)=> item._id);
    // console.log('newData', newData );
    this.wishListData=newData;      
    }
  })
 }

wishListData:string[]=[];
 //*=> add product to wishlist
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

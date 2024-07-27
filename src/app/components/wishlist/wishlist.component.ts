import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  constructor(private _WishlistService:WishlistService , private _CartService:CartService, private _ToastrService:ToastrService){}

  wishlistProducts:any[]=[];

  ngOnInit(){
     //*=> display user wishlist
      this._WishlistService.getUserWishList().subscribe({
        next:(response)=>{
          console.log(response.data); 
          this.wishlistProducts=response.data;  
        }
      })
  }

  //*=> remove from wishlist 
   remove(productId:string){
    this._WishlistService.removeFromWishlist(productId).subscribe({
      next:(Response)=>{
        console.log(Response);
        //for remove from html also
        this.wishlistProducts=Response.data
        
      }
    })

   }

   //*=> add to cart 
   addToCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
      next:(Response=>{
        console.log(Response);
        this._ToastrService.success(Response.message , 'Fresh Cart');
        this._CartService.cartNumber.next(Response.numOfCartItems);
      })

    })
   }


 

}

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService){}
  
  //*==> display cart
  cartDetails:any={};

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(Response)=>{
        console.log(Response.data); //{totalCartPrice , products:[count , price, product:{[]}]   }
        this.cartDetails=Response.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  };

    //*==> remove product from cart

    removeProduct(productId:string):void{
      this._CartService.RemoveProduct(productId).subscribe({
        next:(Response)=>{
          console.log(Response);
          //for remove from html imediately
          this.cartDetails=Response.data;
          //for update the num of items on the cart after remove an item  
          this._CartService.cartNumber.next(Response.numOfCartItems)
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      
    }
      
  //*==> update Cart Product
    updateCartProduct(productId:string , newCount:number):void{

      if(newCount>0){
        this._CartService.updateCartProduct(productId , newCount ).subscribe({
          next:(Response)=>{
            console.log(Response.data);
            this.cartDetails=Response.data
          },
          error:(err)=>{
            console.log(err);
          }
  
        })

      }
      


    }

    //*==. clear user cart

    clearUserCart(){
      this._CartService.clearUserCart().subscribe({
        next:(Response)=>{
          console.log(Response);
          this.cartDetails=Response;
          this._CartService.cartNumber.next(Response.numOfCartItems)

          
        }
      })
    }

 

}

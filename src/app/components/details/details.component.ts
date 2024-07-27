import { Product } from 'src/app/shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _EcomdataService:EcomdataService, private _CartService:CartService , private _ToastrService:ToastrService){};
  productDetails:Product= {} as Product;



  productSlider: OwlOptions = {
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


  addToCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(Response)=>{
        console.log(Response);
        this._ToastrService.success(Response.message , 'Fresh Cart');
        this._CartService.cartNumber.next(Response.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })


  }


  ngOnInit():void{
   this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      let productId:any = params.get('id')

      this._EcomdataService.getProductDetails(productId).subscribe({
        next:(Response)=>{
          console.log(Response.data);
          this.productDetails=Response.data; 
        }
      })
    }
   })

  }

}

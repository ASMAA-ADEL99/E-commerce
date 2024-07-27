import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private _FormBuilder:FormBuilder , private _ActivatedRoute:ActivatedRoute, private _CartService:CartService){}

  checkout:FormGroup=this._FormBuilder.group({
    details:[''],
    phone:[''],
    city:['']
  })

  cartId:any='';

  ngOnInit():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId=params.get('id')

      }

    })

  }

  handleForm():void{
    console.log(this.checkout.value);

    this._CartService.checkOut(this.cartId ,this.checkout.value ).subscribe({
      next:(Response)=>{
        console.log(Response);
        //i will open the url in the response by open function not by navigation because it is not a path it is a url
        if(Response.status == 'success'){
          window.open(Response.session.url, '_self')

        }
      }



    })
    
  }
  

}

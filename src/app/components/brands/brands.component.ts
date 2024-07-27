import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor(private _EcomdataService:EcomdataService){}
    brands:any[]=[];
  ngOnInit(){
    this._EcomdataService.getAllBrands().subscribe({
      next:(Response)=>{
        console.log(Response.data);
        this.brands=Response.data
      }

    })

  }

}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {

  constructor(private _AuthService:AuthService) { }

  ngOnInit():void{

    const userId = this._AuthService.saveUserData();
    console.log('User ID:', userId);
   
  }

  
  

  

}

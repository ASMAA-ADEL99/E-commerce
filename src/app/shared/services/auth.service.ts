import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient, private _Router:Router,
    
  ) {
    
   }
  setRegister(userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,userData)

  };

  setLogin(userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData);
  }

  userData :any;
  saveUserData(){
    if(localStorage.getItem('etoken') != null){
    let  encodeToken:any = localStorage.getItem('etoken');
    let decodeToken = jwtDecode(encodeToken);
    this.userData=JSON.stringify(decodeToken) ;
    console.log("decode token" + decodeToken);
    }
   
  }

  logOut():void{
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
    
  }






}

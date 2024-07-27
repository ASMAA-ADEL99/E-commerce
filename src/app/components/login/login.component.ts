import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService ,private _Router:Router , private _FormBuilder:FormBuilder) { }
  msgError:string="";
  isloading:boolean=false;

  /*loginForm= new FormGroup({
     email :new FormControl(null , [Validators.required , Validators.email]),
     password:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,10}$/)])

  })*/
  //&==> modern way
  loginForm:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]],
    password:[null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,10}$/)]]
  })

  handleLogin(){
    if(this.loginForm.valid){
      this.isloading=true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          if(response.message == "success"){
            this.isloading=false;
            localStorage.setItem('etoken', response.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);  
        }},
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          this.isloading=false;
          this.msgError=err.error.message;

        }
      })
    }else{
      //if the user press th login button before enter his data
      this.loginForm.markAllAsTouched();
    }

    }
  }


import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { required } from '@rxweb/reactive-form-validators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router:Router){}

  msgError:string="";
  //for loading when press on the button
  isloading:boolean=false;

  registerForm:FormGroup = new FormGroup({
    name : new FormControl('' ,[ Validators.required , Validators.minLength(3) ,Validators.maxLength(10)]),
    email :new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('' ,[ Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,10}$/)]),
    rePassword: new FormControl('' , [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,10}$/)]),
    phone: new FormControl('' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators:[this.confirmPassword]} as FormControlOptions);

  confirmPassword(group:FormGroup){

    let password = group.get('password');
    let rePassword = group.get("rePassword");

    if (rePassword?.value == ""){
      rePassword?.setErrors({required:true})
    } else if(password?.value != rePassword?.value){
      rePassword?.setErrors({mismatch:true});
    }

  }
     

 handleForm(){

  if(this.registerForm.valid){
    this.isloading=true;
    this._AuthService.setRegister(this.registerForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.message == "success"){
          this.isloading=false;
          //programing routing
          this._Router.navigate(['/login'])  
      }
    },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        this.isloading=false;
        //if the email is already exist
        this.msgError=err.error.message
      }

    })
  }else{
    this.registerForm.markAllAsTouched();
  }

 }

}

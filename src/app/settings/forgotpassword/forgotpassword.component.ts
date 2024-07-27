import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { email } from '@rxweb/reactive-form-validators';
import { ForgotpasswordService } from 'src/app/shared/services/forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  constructor(private _ForgotpasswordService:ForgotpasswordService , private _Router:Router){};
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  email:string ='';
  userMsg:string='';

  forgotForm:FormGroup=new FormGroup({
    email: new FormControl('',  [Validators.required , Validators.email])
  });

  resetCodeForm:FormGroup=new FormGroup({
    resetCode:new FormControl('')
  });

  resetPassword:FormGroup = new FormGroup({
  newPassword:new FormControl('', [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  })
  
  //*> verify email
  forgotPassword():void{
    let userEmail= this.forgotForm.value;  //=> object {email:value}
    this.email=userEmail.email;  //=> value of email
    this._ForgotpasswordService.forgotPassword(userEmail).subscribe({
      next:(Response)=>{
        console.log(Response);
        this.userMsg=Response.message;
        this.step1=false;
        this.step2=true;
        
      },
      error:(err)=>{
        this.userMsg=err.error.message;
      }

    })
  };

    //*> verify resetCode
  restCode():void{
    let resetCode= this.resetCodeForm.value
    this._ForgotpasswordService.resetCode(resetCode).subscribe({
      next:(Response)=>{
        console.log(Response);
        this.userMsg=Response.status;
        this.step2=false;
        this.step3=true;
      },
      error:(err)=>{
        this.userMsg=err.error.message;
      }
    })
  };

  newPassword():void{
    let resetForm = this.resetPassword.value;
    resetForm.email=this.email;
    this._ForgotpasswordService.resetPassword(resetForm).subscribe({
      next:(Response)=>{
        console.log(Response);
        if(Response.token){
          localStorage.setItem('etoken' , Response.token);
          this._Router.navigate(['/login'])
        } 
      },
      error:(err)=>{
        this.userMsg=err.error.message
      }

    })
  };


}

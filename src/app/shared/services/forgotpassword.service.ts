import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string=`https://ecommerce.routemisr.com/api/v1/auth/`

  //*verify email
  forgotPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `forgotPasswords`,userEmail)
  }

   //* verify reset code
   resetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `verifyResetCode` , resetCode)
   }

   //* reset password 
   resetPassword(resetPasswordForm:object):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `resetPassword` , resetPasswordForm)

   }
}

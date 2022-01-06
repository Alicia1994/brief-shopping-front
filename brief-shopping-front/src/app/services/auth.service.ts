import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRequest } from '../models/payload/user.request';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dev = false;
  baseUrl = 'http://localhost:8080/api/auth';
  API_URL?: string
  private jwtHelper = new JwtHelperService();
  URL_DEV = 'http://localhost:8080/api/auth';
  jwtHelperService: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router  ) {  }


  login(user: UserRequest) {
    return this.httpClient.post(`${this.URL_DEV}/login`, user)
    .pipe(
      map((resp: any) => {
        localStorage.setItem('TOKEN_APPLI', resp.accessToken);
        localStorage.setItem('USER_ID', resp.id);
        // console.log(localStorage.setItem('TOKEN_APPLI', resp.accessToken));
        console.log(resp.id);
        console.log('Token Save');
        return resp;
      })
    );
  }
//********************************************************************************************************************* */

  getUserIdToken() {
    const userId  = localStorage.getItem('USER_ID');
    if(userId){
      return parseInt(userId);
    }
    return null;
  }
  // ***************************************************************************************************************************
  getToken(){
      const token:any =localStorage.getItem('TOKEN_APPLI');
      console.log(token)
      if(token){
        return token;
      }
  }
  // ***************************************************************************************************************************

  getCurrentUser(){
      const user_id:any =localStorage.getItem('USER_ID');
      if(user_id){
        return user_id;
      }
  }

  // ***************************************************************************************************************************
  getUserId(){
    const helper = new JwtHelperService;
    const decodedToken = helper.decodeToken(this.getToken());
    console.log(decodedToken);
    const id = parseInt(decodedToken.sub);
    return id;
  }

  // ********************************************************************************************************************************
  getUserTokenRole(){
    const token:any = localStorage.getItem("TOKEN_APPLI");
    const decode = this.jwtHelper.decodeToken(token);
    // console.log( decode);
    if (decode !== null) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return { ...decode, token };
      } else {
        localStorage.removeItem('TOKEN_APPLI');
      }
    }
    return null;
  }

  // ***************************************************************************************************************************
  newAdmin(newAdmin: UserRequest) {
    return this.httpClient.post
    (`${this.baseUrl}/register`, newAdmin)
  }

// ***************************************************************************************************************************


  register(newUser: UserRequest) {
    return this.httpClient.post(`http://localhost:8080/api/auth/register`, newUser)
  }

// ***************************************************************************************************************************
  logout() {
    localStorage.removeItem('TOKEN_APPLI');
    this.router.navigate(['/bye']);
  }
}

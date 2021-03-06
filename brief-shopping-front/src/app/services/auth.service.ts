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

  constructor( private httpClient: HttpClient, private router: Router ) {  }



  register(newUser: UserRequest) {
    return this.httpClient.post(`http://localhost:8080/api/auth/register`, newUser)
  }

  newAdmin(newAdmin: UserRequest) {
    return this.httpClient.post
    (`${this.baseUrl}/register`, newAdmin)
  }

  createNewUser(newUser: UserRequest) {
    return this.httpClient.post
    (`${this.baseUrl}/createNewUser`, newUser)
  }

  login(user: UserRequest) {
    return this.httpClient.post(`${this.URL_DEV}/login`, user)
    .pipe(
      map((resp: any) => {
        localStorage.setItem('TOKEN_APPLI', resp.accessToken);
        localStorage.setItem('USER_ID', resp.id);
        console.log(resp.id);
        console.log('Token Save');
        return resp;
      })
    );
  }

  logout() {
    localStorage.removeItem('TOKEN_APPLI');
    this.router.navigate(['/bye']);
  }

  getToken(){
    const token:any =localStorage.getItem('TOKEN_APPLI');
    console.log(token)
    if(token){
      return token;
    }
  }

  getUserIdToken() {
    const userId  = localStorage.getItem('USER_ID');
    if(userId){
      return parseInt(userId);
    }
    return null;
  }

  getCurrentUser(){
    const user_id:any =localStorage.getItem('USER_ID');
    if(user_id){
      return user_id;
    }
  }

  getUserTokenRole(){
    const token:any = localStorage.getItem("TOKEN_APPLI");
    const decode = this.jwtHelper.decodeToken(token);
    if (decode !== null) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return { ...decode, token };
      } else {
        localStorage.removeItem('TOKEN_APPLI');
      }
    }
    return null;
  }

  getUserId(){
    const helper = new JwtHelperService;
    const decodedToken = helper.decodeToken(this.getToken());
    console.log(decodedToken);
    const id = parseInt(decodedToken.sub);
    return id;
  }
}

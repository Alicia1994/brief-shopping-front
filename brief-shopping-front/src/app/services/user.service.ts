import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SearchRequest } from '../models/payload/searchRequest';
import { UserRequest } from '../models/payload/user.request';
import { User } from '../models/user';
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { UserRequest } from '../models/payload/user.request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "http://localhost:8080/api/users"

  userSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) { }

  create(newUser: UserRequest){
    const body=JSON.stringify(newUser);
    const formData=new FormData();
    for(const [key, value] of Object.entries(newUser)){
      formData.append(key,value)
    }
    console.log(body);
    return this.httpClient.post(this.baseUrl, newUser)
  }

  getById(id: number) {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  getUserById(id: number) {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  getAllUser():Observable<Array<UserRequest>>  {
    return this.httpClient.get<Array<UserRequest>>(`${this.baseUrl}`);
  }

  searchUser(username: String){
    return this.httpClient.get<User>(`http://localhost:8080/api/users/search/${username}`);
  }

  // search(user: SearchRequest){
  //   return this.httpClient.get<User>(`http://localhost:8080/api/users/search`, user);
  // }

  updateUser(updateUser: UserRequest) {
    return this.httpClient.put(`${this.baseUrl}/modif`, updateUser);
  }

  delete(id : number){
    return this.httpClient.delete(`${this.baseUrl}/delete/` + id);
  }
}

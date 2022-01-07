import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  constructor(private httpClient: HttpClient) {
  }

  baseUrl = `${environment.baseUrl}/category`;

    findAll(): Observable<Array<Category>>{
    return this.httpClient.get<Array<Category>>( this.baseUrl + '/all');
  }

}
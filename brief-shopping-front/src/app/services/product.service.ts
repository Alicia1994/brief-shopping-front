import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = `${environment.baseUrl}/product`;

  constructor(private httpClient: HttpClient) {     
  }

    findAllProducts(): Observable<Array<Product>>{
    return this.httpClient.get<Array<Product>>( this.baseUrl + '/all');
  }

}

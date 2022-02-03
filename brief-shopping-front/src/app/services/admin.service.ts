import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  postSubject = new Subject<Product[]>();
  constructor(private httpClient: HttpClient) { }
  baseUrlAdmin = `${environment.baseUrl}/admin`;

  // ****** API requests for products ******
  create(formData: FormData) {
    return this.httpClient.post(this.baseUrlAdmin, formData);
  }

  update(formData: FormData) {
    return this.httpClient.put<Product>(this.baseUrlAdmin, formData)
  }

  delete(idProduct: Number): Observable<Product> {
    return this.httpClient.delete<Product>(this.baseUrlAdmin + '/' + idProduct)
  }

}

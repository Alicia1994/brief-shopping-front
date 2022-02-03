import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription, Observable, map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';
import * as moment from 'moment';
import { environment, environmentApi } from 'src/environments/environment';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  productSub: Subscription | undefined;
  dataProducts: Product[] | undefined;
  isDeleted: boolean = false;
  products: Product[] | undefined;
  products$!: Observable<Array<Product>>;
  data: any;
  searchText: string | undefined;
  modalRef!: BsModalRef<unknown>;
  idToBeDeleted = '';
  message: string | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    private adminService: AdminService,
    private modalService: BsModalService
  ) { }

 
  ngOnInit() {
    this.products$ = this.productService.findAllProducts().pipe(
      map((products: Array<Product>) => {
        return products;
      }));
  }

    // ****** Filter by categories *********
  clickCat(categ: string | undefined) {
    this.products$ = this.productService.findAllProducts().pipe(
      map(products => products.filter(product => product?.category?.name == categ)));
  }

  clickAll() {
    this.products$ = this.productService.findAllProducts().pipe(
      map((products: Array<Product>) => {
        return products;
      }));
  }

  // ****** Handle the publication of the articles with Moment Library *********
  // setTimeToMoment(date: string) {
  //   const date1 = moment(date, "YYYY-MM-DD h-mm");
  //   const date2 = moment(new Date().toLocaleString(), "DD/MM/YYYY, h:mm:s");
  //   const dateDiff = date2.diff(date1, "hours");
  //   if (dateDiff < 24) {
  //     return moment(date, "YYYY-MM-DD h-mm").fromNow();
  //   } else if (dateDiff >= 24) {
  //     const dateSplit = date.split(" ");
  //     const day = dateSplit[0].replace(/-/g, "/").split("/").reverse().join("/");
  //     const hour = dateSplit[1].replace("-", "h")
  //     return day + " à " + hour
  //   }
  // }

  // ****** Delete Post by Id after the confirmation on modal *********
  deleteProduct(id: number) {
    this.productSub = this.adminService.delete(id).subscribe(data => {
    });
    this.products$ = this.products$.pipe(
      map(products =>
        products.filter(product => product.id != id))
    )
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.delete();
  }

  path(product: Product): string {
    return `${environmentApi.apiUrlImage}/${product.id}/${product.image}`;
  }

  // HANDLE MODAL
  openModal(template: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.idToBeDeleted = id;
  }

  delete():void{
    console.log('deleted',this.idToBeDeleted,' record');
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
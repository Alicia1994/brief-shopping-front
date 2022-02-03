import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map, Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { environmentApi } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  boolean = true;
  // users$: Observable<Array<User>>;
  products$!: Observable<Array<Product>>;
  productSub: Subscription | undefined;
  dataProducts: Product[] | undefined;
  isDeleted: boolean = false;
  products: Product[] | undefined;
  data: any;
  searchText: string | undefined;
  modalRef!: BsModalRef<unknown>;
  idToBeDeleted = '';
  message: string | undefined; 
  categories: Category[] = [];


  constructor(
    private productService: ProductService,
    private router: Router,
    private adminService: AdminService,
    private categoryService: CategoryService
        ) { }

    ngOnInit() {
      // this.products$ = this.productService.findAllProducts();

      this.retrieveProducts();
      this.retrieveCategories();

      this.products$ = this.productService.findAllProducts().pipe(
        map((products: Array<Product>) => {
          return products;
        }));
    }


    retrieveProducts(): void {
      this.productService.findAllProducts()
        .subscribe(
          data => {
            this.products= data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }

    retrieveCategories(): void {
      this.categoryService.findAll()
        .subscribe(
          data => {
            this.categories= data;
            console.log(this.categories);
          },
          error => {
            console.log(error);
          });
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
    // this.message = 'Confirmed!';
    // this.modalRef.hide();
    // this.delete();
  }

  path(product: Product): string {
    return `${environmentApi.apiUrlImage}/${product.id}/${product.image}`;
  }

  // HANDLE MODAL
  // openModal(template: TemplateRef<any>, id: any) {
  //   this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  //   this.idToBeDeleted = id;
  // }

  delete():void{
    console.log('deleted',this.idToBeDeleted,' record');
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

}

import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

products: Product[] = [];
categories: Category[] = [];

constructor(private productService: ProductService, private categoryService: CategoryService) {
 }

ngOnInit(): void {

this.retrieveProducts();
this.retrieveCategories();
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

}

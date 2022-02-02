import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  boolean = true;
  // users$: Observable<Array<User>>;
  products$!: Observable<Array<Product>>;

  constructor(
    private adminService: AdminService,
    private productService: ProductService) { }

    ngOnInit() {
      this.products$ = this.productService.findAllProducts()
    }

}

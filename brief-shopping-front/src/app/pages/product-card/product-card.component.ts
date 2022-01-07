// import { Component, Input, OnInit } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { Product } from 'src/app/models/product';
// import { ProductService } from 'src/app/services/product.service';

// @Component({
//   selector: 'app-product-card',
//   templateUrl: './product-card.component.html',
//   styleUrls: ['./product-card.component.scss']
// })
// export class ProductCardComponent implements OnInit {
//   private data: any[] | undefined;
// public listCategories!: string[];
// //private subListProduct: Subscription;
// public listProduct!: any[];
// //product$: Observable<Array<Product>> | undefined;
// products: any;
//   @Input() product: any;

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.product = this.productService.findAllProducts().pipe(
//       map((products: Array<Product>) => {
//         return products;
//       }));

//       console.log(this.product);
  
//   }

// }

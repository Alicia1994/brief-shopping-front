import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

// dataProduct?: Product[];
// product$: Observable<Array<Product>> | undefined;
// products: any;

products: Product[] = [];


constructor(private productService: ProductService) {
 }

ngOnInit(): void {
//  console.log(this.products);


this.retrieveProducts();


  // this.product$ = this.productService.findAllProducts().pipe(
  //   map((products: Array<Product>) => {
  //     console.log(products);
  //     this.dataProduct = products;
  //     console.log(this.dataProduct);
  //     return products;
  //   }));
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

getProducts(){
  this.productService.findAllProducts().subscribe(
    (product: Product[]) => {
      console.log(product);
    }
  )
}


// ngOnInit(): void {
//   this.getUsers();
//   this.userSubscription = this.userService.userSubject.subscribe(
//     (resp: User[]) => {
//       this.dataUser = resp;
//     }
//   )
// }

// getUsers() {
//   this.userService.getAllUser().subscribe(
//     (users:User[]) => {
//       const roles = ["ROLE_EMPLOYE", "ROLE_CLIENT"];
//       console.log(users);
//       this.dataUsers = users.filter((data:User) =>
//       !!data.roles?.find((role:any) => roles.includes(role.name)));
//     }
//   )
// }

}

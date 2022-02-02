import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddProductComponent } from "./add-product/add-product.component";
import { DashboardComponent } from "./dashboard.component";
import { HandleProductComponent } from "./handle-product/handle-product.component";
import { ListProductsComponent } from "./list-products/list-products.component";
import { UpdateProductComponent } from "./update-product/update-product.component";

const routes: Routes = [
  {
    path: '', 
    component: DashboardComponent, 
    canActivate: ["onlyGuard"], 
    data: { roles: ['ADMIN'] }, 
    children: [
      { path: "handle-post/list-products", component: ListProductsComponent },
      { path: "handle-product", component: HandleProductComponent },
      { path: "handle-post/add-product", component: AddProductComponent },
      { path: 'handle-post/update-product/:id', component: UpdateProductComponent },
      {path:'', redirectTo: "/admin", pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AddProductComponent } from './add-product/add-product.component';
import { HandleProductComponent } from './handle-product/handle-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DashboardComponent } from './dashboard.component';


@NgModule({
    declarations: [
      AddProductComponent,
      HandleProductComponent,
      ListProductsComponent,
      UpdateProductComponent,
      DashboardComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule, 
      RouterModule,
      EditorModule,
    ]
  })
  
  export class DashboardModule { }
  
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  product: Product | undefined;
  currentUsername?: any;
  categories: [] = [];
  userFile: any;
  public imagePath: any;
  imgURL: any;
  localStorageService: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private adminService: AdminService,
    //private localStorageService: LocalStorageService,
    //private userService: UserService,
    private categoryService: CategoryService,
    private fb: FormBuilder) {
    this.addProductForm = new FormGroup({});
  }

  ngOnInit() {
    this.initForm();
    this.categoryService.findAll().subscribe((data: any) => {
      this.categories = data;
    })
  }

      /****** Form to register the post's informations ******/
  initForm() {
    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categorie: this.fb.group({ id: new FormControl('') }),
    })
  }

   /****** New Form to send posts infos & an image ******/
   addProduct() {
    const formData = new FormData();
    const newProduct = this.addProductForm?.value;
    formData.append('file', this.userFile);
    formData.append('product', new Blob([JSON.stringify(newProduct)], { type: "application/json" }))
    this.currentUsername = this.localStorageService.retrieve("username");
    this.adminService.create(formData).subscribe(data => {
      this.router.navigateByUrl('/admin/handle-product');
    }, error => {
      console.log('Failure Response');
    })
  }

      /****** Function to display the image ******/
  onSelectFile(event: { target: { files: string | any[]; }; }) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  userFile!: string | Blob;
  imgURL: any;
  updateProductForm: FormGroup;
  id: number | undefined;
  username: string | undefined;
  sub: Subscription | undefined;
  categories: [] = [];
  public imagePath: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private categoryService: CategoryService,
    private fb: FormBuilder) {
    this.updateProductForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.initForm();
    this.categoryService.findAll().subscribe((data: any) => {
      this.categories = data;
    })

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.productService.findById(this.id).subscribe(product => {
        this.id = product.id;
        this.updateProductForm.patchValue(product);
       // this.username = product.username;
      })
    })
  }

  initForm() {
    this.updateProductForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      id: new FormControl(0),
      username: new FormControl(''),
      categorie: this.fb.group({ id: new FormControl('') }),
      image: new FormControl('')
    });
  }

  updateProduct() {
    const formData = new FormData();
    const newProduct = this.updateProductForm.value;
    formData.append('file', this.userFile);
    formData.append("product", new Blob([JSON.stringify(newProduct)], { type: "application/json" }));

    this.adminService.update(formData).subscribe(
      resp => {
        console.log("modification effectuée")
        this.router.navigateByUrl("/admin/handle-post")
      }
    )
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var reader = new FileReader();
      this.imagePath = file;
     // console.log(file);
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public title: string;
  public lengthListProduct!: number;

  constructor(private plantService: ProductService) {
    this.title = '🪴 DVD';
    
    // this.plantService.subjectListProduct$.subscribe(data => {
    //   this.lengthListProduct = data.length;
    // })
  }

  ngOnInit(): void {
  }

}
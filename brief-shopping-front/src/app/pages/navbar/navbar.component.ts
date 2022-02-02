import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public title: string;
  public lengthListProduct!: number;

  constructor(
    private plantService: ProductService,
    private authService: AuthService,
    private router: Router

    ) {
    this.title = '🪴 DVD';

    // this.plantService.subjectListProduct$.subscribe(data => {
    //   this.lengthListProduct = data.length;
    // })
  }

  ngOnInit(): void {
  }

  isAdmin(){
    return(this.authService.getUserTokenRole().roles[0].authority == 'ROLE_ADMIN')
  }

  isEmploye(){
    return(this.authService.getUserTokenRole().roles[0].authority == "ROLE_EMPLOYE");
  }

  logout() {
    localStorage.removeItem('TOKEN_APPLI');
    this.router.navigate(['/login']);
  }
}

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FilterSidebarComponent } from './pages/filter-sidebar/filter-sidebar.component';
//import { ProductCardComponent } from './pages/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponentComponent,
    NavbarComponent,
    HomepageComponent,
    FilterSidebarComponent,
    //ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
 ],
 bootstrap: [AppComponent]
})
export class AppModule { }

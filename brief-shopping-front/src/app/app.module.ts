import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateNewUserComponent } from './pages/create-new-user/create-new-user.component';
import { UserComponent } from './components/user/user.component';
import { CartComponent } from './components/cart/cart.component';
import { UserProfilComponent } from './pages/user-profil/user-profil.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DashboardModule } from './dashboard-product/dashboard/dashboard.module';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponentComponent,
    RegisterComponent,
    LoginComponent,
    CreateNewUserComponent,
    UserComponent,
    CartComponent,
    UserProfilComponent,
    EditUserComponent,
    NavbarComponent,
    HomepageComponent,
    LayoutComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
 ],
 bootstrap: [AppComponent]
})

export class AppModule { }

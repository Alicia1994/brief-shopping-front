import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { CreateNewUserComponent } from './pages/create-new-user/create-new-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { LoginComponent } from './pages/login/login.component';

import { HomepageComponent } from './pages/homepage/homepage.component';

import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfilComponent } from './pages/user-profil/user-profil.component';

const routes: Routes = [


  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'newUser', component: CreateNewUserComponent},
  { path: 'user', component: UserComponent},
  { path: 'edit-profil', component: EditUserComponent},
  { path: 'profil', component: UserProfilComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomepageComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

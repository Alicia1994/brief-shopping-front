import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: '**', component: RegisterComponent},

  // { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

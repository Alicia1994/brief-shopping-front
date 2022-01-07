import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  dataUsers?: User[];
  dataUser?: User[];
  user?: User;
  userSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  searchForm = new FormGroup({
    name: new FormControl('')
  });

  ngOnInit(): void {
    this.getUsers();
    this.userSubscription = this.userService.userSubject.subscribe(
      (resp: User[]) => {
        this.dataUser = resp;
      }
    )
  }

  getUsers() {
    this.userService.getAllUser().subscribe(
      (users:User[]) => {
        const roles = ["ROLE_EMPLOYE", "ROLE_CLIENT"];
        console.log(users);
        this.dataUsers = users.filter((data:User) =>
        !!data.roles?.find((role:any) => roles.includes(role.name)));
      }
    )
  }

  getUser() {
    this.userSubscription = this.userService.searchUser(this.searchForm.value).subscribe(
      (resp: User[]) => {
        this.dataUser = resp;
        console.log(this.dataUser)
      }
    )
  }

  onSubmit() {
    this.getUser();
  }

  ngOnDestroy(){
    this.userSubscription?.unsubscribe();
    console.log('destroy component project')
  }

  onDelete(id:number){
    this.dataUser = this.dataUser?.filter((data:any) => data.id != id)
  }

  tolowerRole(roleName:any){
    const role:any = {
        ROLE_EMPLOYE: 'Employe',
        ROLE_CLIENT: 'Client',
        ROLE_ADMIN: 'Admin',
    }
    return role[roleName];
  }

  deleteUser(user: any) {
    this.userService.delete(user.id).subscribe(
      (user: User) => {
        console.log(user);
        this.dataUser = this.dataUser?.filter((data:any) => data.id != user.id);
        console.log('delete reussit');
      }
    )
  }


  toBack(event:any){//permet de revenir en haut
    window.scrollTo(0,0);//permet de definir l'endroit exact (en px) pour revenir dans la page
    event.preventDefault();
  }
}

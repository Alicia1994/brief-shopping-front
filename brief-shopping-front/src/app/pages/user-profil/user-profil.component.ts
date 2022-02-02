import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {
  user: User | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.authService.getUserIdToken();
    if(id){
      this.userService.getById(id).subscribe((user: User) => {
        this.user = user
        console.log(user)
      });
    }
  }

  tolowerRole(roleName:any){
    const role:any = {
        ROLE_EMPLOYE: 'employe',
        ROLE_CLIENT: 'client',
        ROLE_ADMIN: 'Admin',
    }
    return role[roleName];
  }
}

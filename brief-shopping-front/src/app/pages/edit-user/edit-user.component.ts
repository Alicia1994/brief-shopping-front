import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  dataUsers?: User[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  userForm = new FormGroup({
    id : new FormControl(''),
    username : new FormControl(''),
    email : new FormControl(''),
    presentation : new FormControl('')
  })

  ngOnInit(): void {
    const id:any = this.authService.getUserIdToken();
    this.userService.getById(id).subscribe(
      (user: User) => {
        this.userForm.patchValue(user);
        console.log(user);
      }
    )
  }

  updateUser() {
    const formValues = this.userForm?.value;
    console.log(formValues);
    this.userService.updateUser(formValues).subscribe(
      (user: any) => {
        console.log(user);
        this.router.navigate(['/profil']);
        console.log("update profil reussie");
      }
    )
  }
}

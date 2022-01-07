import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent implements OnInit {
  newUserForm = new FormGroup({
    email: new FormControl('admin@mail'),
    username: new FormControl('admin'),
    presentation: new FormControl('presentation'),
    role : new FormControl('', Validators.required),
    password: new FormControl('User123@', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])
  });

  get password(){
    return this.newUserForm.get("password");
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const formValues = this.newUserForm?.value;
    // formValues.role = [formValues.role];
    console.log(formValues);
    this.authService.register(formValues).subscribe(
      (user: any) => {
        console.log('reussit',  user);
        // this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

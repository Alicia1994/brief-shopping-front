import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
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
    return this.registerForm.get("password");
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const formValues = this.registerForm?.value;
    // formValues.role = [formValues.role];
    console.log(formValues);
    this.authService.register(formValues).subscribe(
      (user: any) => {
        console.log('reussit',  user);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

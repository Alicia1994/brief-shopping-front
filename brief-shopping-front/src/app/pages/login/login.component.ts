import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('admin'),
    password: new FormControl('User123@', [
      Validators.required,
      Validators.minLength(4),
    ])
  });


  constructor(
    private authService: AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // console.log(form.value);
    this.authService.login(this.loginForm.value).subscribe(
      (resp: any) => {
        console.log("Connection succeed", resp);
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      }

    )
  }
  // loginForm = new FormGroup({
  //   username: new FormControl('user'),
  //   password: new FormControl('user1234', [
  //     Validators.required,
  //     Validators.minLength(4),
  //   ])
  // });
  // constructor(
  //   private authService: AuthService,
  //   private router : Router
  // ) { }
  // ngOnInit(): void {}
  // onSubmit() {
  //   // console.log(form.value);
  //   this.authService.login(this.loginForm.value).subscribe(
  //     (resp: any) => {
  //       console.log("Connection succeed", resp);
  //       this.router.navigate(['/']);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  error: any;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(8)])]
    })
    this.loginForm.valueChanges.subscribe((x: any) => {
      this.error=null;
    })
  }

  login() {
    let payload = {
      email: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    this.loginService.AuthenticateUser(payload).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(["dashboard"]);
      },
      error => this.error = error
    );
  }
}

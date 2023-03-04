import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoginMode = true;
  isAuth = false;
  private sub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.sub = this.authService.getAuthStatusListener().subscribe((isAuth) => {
      this.isAuth = isAuth;
      this.isLoading = false;
    });
  }

  onLogin(form: NgForm) {
    if (this.isLoginMode) {
      //login
      if (form.invalid) {
        return;
      }
      this.authService.login(form.value.email, form.value.password);
      this.isLoading = true;
    } else {
      //signup
      if (form.invalid) {
        return;
      }
      this.authService.signup(form.value.email, form.value.password);
    }

    form.resetForm();
  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

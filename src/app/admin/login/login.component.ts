import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/service/auth.service';
import { Login, LoginSuccess } from 'src/app/store/admin';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  submit() {
      if (this.loginForm.valid) {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        this.store.dispatch(new Login({ username, password }));
        
        this.authService.Login(
            username,
            password
          ).subscribe((res) => {
              this.store.dispatch(new LoginSuccess(res));
              this.router.navigate(['admin']);
          });
      }      
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user.model';
import * as jwtDecode from 'jwt-decode';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  loginError: string = '';
  isLoading: boolean = false; // Trạng thái loading

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.isLoading = true;
    localStorage.setItem('useremail', this.email);

    this.authService.login(this.email, this.password)
      .subscribe(
        (data: any) => {
          if (data.code === 200) {
            setTimeout(() => {
              this.isLoading = false;
              this.router.navigate(['/verify-code']);
            }, 2000);
          } else {
            this.isLoading = false;
            this.loginError = data.message;
            console.log(this.loginError);
          }
        })
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
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

  email!: string;
  password!: string;
  loginError!: string;
  window: any;
  userRole!: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {

    localStorage.setItem('useremail', this.email)
    this.router.navigate(['/verify-code']);
    this.authService.login(this.email, this.password)
      .subscribe(
        data => { }
      );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

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
  loginError: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.isLoading = true;
    this.loginError = null;

    this.authService.login(this.email, this.password)
      .subscribe({
        next: data => {
          localStorage.setItem('useremail', this.email);
          this.isLoading = false;
          if (data.code === 200) {

            setTimeout(() => {
              this.router.navigate(['/verify-code']);
            }, 2000);
          }
        },
        error: e => {
          this.isLoading = false;
          this.loginError = e.error.message || 'An error has occurred, please try again.';
        }
      });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}

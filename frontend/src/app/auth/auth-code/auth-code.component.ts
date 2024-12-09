import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-code',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './auth-code.component.html',
  styleUrls: ['./auth-code.component.scss']
})
export class AuthCodeComponent implements OnInit, OnDestroy {

  auth_code!: string;
  email!: string;
  message!: string;
  verify: boolean = true;
  countdown: number = 60;
  intervalId: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('useremail') || '';
    console.log(this.email);
    localStorage.removeItem('useremail');
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.intervalId);
        window.alert("Timeout")
        this.router.navigate(['/login']);
      }
    }, 1000);
  }

  auth(email: string, auth_code: string) {
    this.authService.verifyLogin(email, auth_code).subscribe({
      next: data => {
        const token_key = localStorage.getItem("auth_token");
        if (token_key) {
          const decodedToken = jwtDecode(token_key) as any;
          const userRole = decodedToken.scope;
          localStorage.setItem("userId", decodedToken.userId);

          console.log('Đăng nhập thành công');
          if (userRole === "ROLE_ADMIN" || userRole === "ROLE_MANAGER") {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      error: e => {
        this.message = e.error.message || 'An error has occurred, please try again.';
        console.log(this.message);
        this.verify = false;
      }
    });
  }

  submit() {
    this.auth(this.email, this.auth_code);
  }
}

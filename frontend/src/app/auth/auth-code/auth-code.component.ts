import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-auth-code',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth-code.component.html',
  styleUrl: './auth-code.component.scss'
})
export class AuthCodeComponent implements OnInit {

  auth_code!: string;
  email!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('useremail') || '';
    console.log(this.email);
    localStorage.removeItem('useremail');
  }

  auth(email: string, auth_code: string) {
    this.authService.verifyLogin(email, auth_code).subscribe(data => {
      const token_key = localStorage.getItem("auth_token");

      if (token_key) {
        const decodedToken: any = jwtDecode(token_key);
        const userRole = decodedToken.scope;

        console.log('Đăng nhập thành công');
        if (userRole === "ROLE_ADMIN" || userRole === "ROLE_MANAGER") {
          this.router.navigate(['/admin/dashboard']);
        }
        else {
          this.router.navigate(['/']);
        }
      }
    })
  }

  submit() {
    this.auth(this.email, this.auth_code)
  }

}

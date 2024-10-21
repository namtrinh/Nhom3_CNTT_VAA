import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent {
  reset_key: string = '';
  newPassword: string = '';
  email: string = '';
  confirmPassword: string = '';
  message!: string;
  isPasswordMatch: boolean = true;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.reset_key = params['reset_key'];
      this.email = params['email'];
    });
  }

  checkPasswordMatch() {
    this.isPasswordMatch = this.newPassword === this.confirmPassword;
  }

  onSubmit() {
    this.authService.resetPassByEmail(this.reset_key, this.email, this.newPassword).subscribe(() => {
      alert('Mật khẩu đã được thay đổi thành công.');
      this.router.navigate(['/login']);
    });
  }
}

import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent {
  reset_key: string = '';
  newPassword: string = '';
  email: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.reset_key = params['reset_key'];
      this.email = params['email'];
    });
  }

  onSubmit() {
    this.authService.resetPassByEmail(this.reset_key, this.email, this.newPassword).subscribe(() => {
      alert('Mật khẩu đã được thay đổi thành công.');
      this.router.navigate(['/login']);
    });
  }
}

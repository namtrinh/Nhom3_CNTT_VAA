import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../service/user-service.service';
import { jwtDecode } from 'jwt-decode';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-view-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './view-admin.component.html',
  styleUrl: './view-admin.component.scss'
})
export class ViewAdminComponent {

  tokenKey!: any;
  username: any;
  inf: any;
  role: any;
  check_role = false;

  constructor(public dialog: MatDialog, private auth: AuthService, private userService: UserService, private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getinf();
  }
  public title = 'improve myseft';
  public date = Date.now();

  logout() {
    if (window.confirm("Are you sure want to logout ?")) {
      const token = localStorage.getItem("auth_token");
      this.auth.logout(token).subscribe((data: any) => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('userId');
      })
    }
  }

  getinf() {
    this.userService.getmyinf().subscribe(data => {
      this.inf = data.result;
      const encode_token = localStorage.getItem("auth_token");
      if (encode_token) {
        const decodedToken: any = jwtDecode(encode_token);
        const userRole = decodedToken.scope;

        if (userRole === "ROLE_ADMIN") {

          this.check_role = true;

        } else {
          this.check_role = false;
        }
        this.cd.detectChanges();
      }
    },
      error => {
        console.log(error);
      }
    )
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user-service.service';
import { User } from '../../../model/user.model';
import { RolesService } from '../../../service/role-service.service';
import { Roles } from '../../../model/roles.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from '../../../app.routes';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {

  id!: string;
  user: User = new User();
  users: User[] = [];
  imgAvatar!: string;
  roles: Roles[] = [];
  selectedFile: File | null = null;

  constructor(private router: Router, private userService: UserService, private activeRouter: ActivatedRoute,
    private roleService: RolesService) { }

  ngOnInit(): void {
    this.getUserById();
    this.getRoles();
  }

  private getUserById() {
    this.id = this.activeRouter.snapshot.params['user_id'];
    this.userService.getById(this.id).subscribe((data: any) => {
      this.user = data.result;
      this.getImageFromService(this.user.avatar);
    },
      error => {
        console.log(error);
      });
  }

  getImageFromService(imageName: string): void {
    if (imageName !== null && imageName !== undefined) {
      this.userService.getImage(imageName).subscribe(data => {
        const blob = new Blob([data], { type: 'image/*' });
        this.imgAvatar = URL.createObjectURL(blob);
      });
      (error: any) => {
        console.error(error);
      }
    } else { }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    // đọc file và hiện
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgAvatar = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }


  private updateUser() {
   
    const formData = new FormData();
    formData.append('email', this.user.email);
    formData.append('username', this.user.username);
    formData.append('password', this.user.password);
    formData.append('time_created', this.user.time_created);

    if (this.user.roles && this.user.roles.length > 0) {
      this.user.roles.forEach((roles: string) => {
        formData.append('roles[]', roles);
      });
    } else {
      // Nếu không có vai trò mới, thêm vai trò cũ
      this.user.roles.forEach((roles: string) => {
        formData.append('roles[]', roles);
      });
    }

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    } else {
      formData.append('avatar', this.user.avatar);
    }

    this.userService.editUser(this.id, formData).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/admin/list-user']);
        setTimeout(() => {
          window.location.reload();
        })
      },
      error => {
        console.log(error);
      });
  }

  getRoles() {
    this.roleService.getAllroles().subscribe((data: any) => {
      this.roles = data.result;
      console.log(this.roles);
    }, error => {
      console.log(error);
    }
    )
  }



  OnSubmit() {
    // if (!this.user.roles || this.user.roles.length === 0 || this.user.roles) {
    //  this.user.roles = ["USER"];
    ////  }
    // if (this.user.email == "admin@a.o"){
    //    this.user.roles = ["ADMIN"];
    //  }
    this.updateUser();
  }
}

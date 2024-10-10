import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user-service.service';
import {User} from '../../../model/user.model';
import {RolesService} from '../../../service/role-service.service';
import {Roles} from '../../../model/roles.model';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {routes} from '../../../app.routes';
import {FormsModule} from '@angular/forms';
import {format} from 'date-fns';

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
  role: Roles[] = [];
  selectedFile: File | null = null;
  list_role:any;
  select_role: boolean = false;

  constructor(private router: Router,
              private userService: UserService,
              private activeRouter: ActivatedRoute,
              private roleService: RolesService) {
  }

  ngOnInit(): void {
    this.getUserById();
    this.getRoles();
  }

  private getUserById() {
    this.id = this.activeRouter.snapshot.params['user_id'];
    this.userService.getById(this.id).subscribe((data: any) => {
      this.user = data.result;
      this.list_role = this.user.roles;
      this.getImageFromService(this.user.avatar);
    });
  }

  getImageFromService(imageName: string): void {
    if (imageName !== null && imageName !== undefined) {
      this.userService.getImage(imageName).subscribe(data => {
        const blob = new Blob([data], {type: 'image/*'});
        this.imgAvatar = URL.createObjectURL(blob);
      });
    }
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

  selectRole() {
    this.select_role = true;
  }

  private updateUser() {
    if (!this.select_role) {
      this.user.roles = this.list_role.map((role:{name:string}) => role.name);
    }
    this.userService.editUser(this.id, this.user).subscribe(data => {
      this.router.navigate(['/admin/list-user']);
    });
  }

  getRoles() {
    this.roleService.getAllroles().subscribe((data: any) => {
      this.role = data.result;
    })
  }


  OnSubmit() {
    this.updateUser();
  }
}

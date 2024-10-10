import { Component, OnInit } from "@angular/core";
import { User } from "../../model/user.model";
import { Roles } from "../../model/roles.model";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../service/user-service.service";
import { RolesService } from "../../service/role-service.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'edit-my-inf',
  standalone:true,
  imports:[FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditMyInfComponent implements OnInit {

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
  }else{}}

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
    this.userService.editUser(this.id, this.user).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/']);
        setTimeout(() => {
          window.location.reload();
        },50)
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
    this.updateUser();
  }
}

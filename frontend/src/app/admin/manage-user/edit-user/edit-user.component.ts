import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user-service.service';
import {User} from '../../../model/user.model';
import {RolesService} from '../../../service/role-service.service';
import {Roles} from '../../../model/roles.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {

  id!: string;
  user: User = new User();
  imgAvatar!: string;
  role: Roles[] = [];
  list_role:any;
  select_role: boolean = false;

  constructor(private router: Router,
              private userService: UserService,
              private activeRouter: ActivatedRoute,
              private roleService: RolesService,
              private location:Location) {
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

    });
  }

  selectRole() {
    this.select_role = true;
  }

  private updateUser() {
    if (!this.select_role) {
      this.user.roles = this.list_role.map((role:{name:string}) => role.name);
    }
    this.userService.editUser(this.id, this.user).subscribe(data => {
     this.location.back();
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

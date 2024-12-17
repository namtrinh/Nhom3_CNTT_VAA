import {Component, OnInit} from "@angular/core";
import {User} from "../../model/user.model";
import {Roles} from "../../model/roles.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user-service.service";
import {RolesService} from "../../service/role-service.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'edit-my-inf',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditMyInfComponent implements OnInit {

  id!: string;
  user: User = new User();
  roles: Roles[] = [];
  list_role: any;

  constructor(private router: Router,
              private userService: UserService,
              private activeRouter: ActivatedRoute){
  }

  ngOnInit(): void {
    this.getUserById();
  }

  private getUserById() {
    this.id = this.activeRouter.snapshot.params['user_id'];
    this.userService.getById(this.id).subscribe((data: any) => {
      this.user = data.result;
      this.list_role = this.user.roles;
    })
  }

  private updateUser() {
    this.user.roles = this.list_role.map((role: { name: string }) => role.name);
    this.userService.editUser(this.id, this.user).subscribe(
      (data: any) => {
        this.router.navigate(['/']);
      });
  }

  OnSubmit() {
    this.updateUser();
  }
}

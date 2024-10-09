import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Roles } from '../../../model/roles.model';
import { RolesService } from '../../../service/role-service.service';
import { UserService } from '../../../service/user-service.service';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-list-user-byrole',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './list-user-byrole.component.html',
  styleUrl: './list-user-byrole.component.scss'
})
export class ListUserByroleComponent implements OnInit {
  user:any;
  id!: string;
  x!:string;
  roles: Roles = new Roles();
  name!: string;
  users: User[] = [];
  constructor(private userService:UserService, private routerActive: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getIdFromParams();
  }

  getIdFromParams() {
    this.id = this.routerActive.snapshot.params['name'];
    this.userService.getByRole(this.id).subscribe(
      (data: any) => {
       
        this.users = data.result;
        console.log(this.users);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}

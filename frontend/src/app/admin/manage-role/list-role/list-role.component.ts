import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../service/role-service.service';
import { Roles } from '../../../model/roles.model';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-list-role',
  standalone:true,
  imports: [RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.scss'
})
export class ListRoleComponent implements OnInit {
  role:any;
  roles!: Roles[];
  constructor(private roleService: RolesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleService.getAllroles().subscribe((data: any) => {
      this.roles = data.result;
    })
  }
  // Component.ts
  deleterole(name: string) {
    this.roleService.deleteroles(name).subscribe(
      (data: any) => {
        this.getAllRoles();
      });
  }

}

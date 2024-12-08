import { Component } from '@angular/core';
import { RolesService } from '../../../service/role-service.service';
import { Route, Router } from '@angular/router';
import { Roles } from '../../../model/roles.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-role',
  standalone:true,
  imports:[FormsModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss'
})
export class CreateRoleComponent {
  role:Roles = new Roles();

  constructor(private roleService: RolesService, private router:Router){}

  createRole(){
    this.role.permissions = [""];
    this.roleService.createroles(this.role).subscribe((data:any)=>{
      console.log(this.role);
      this.router.navigate(['/admin/role']);
      setTimeout(() =>{
        window.location.reload()
      }, 0)
    })
  }
  OnSubmit(){

    this.createRole();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RolesService } from '../../../service/role-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../../model/roles.model';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss'
})
export class EditRoleComponent implements OnInit {
  id!: string;
  roles: Roles = new Roles();
  constructor(private roleService: RolesService, private routerActive: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getById();
  }

  getById() {
    this.id = this.routerActive.snapshot.params['name'];
    this.roleService.getById(this.id).subscribe((data: any) => {
      this.roles = data.result;
    }), (error: any) => {
      console.log(error);
    };

  }

  EditById() {
    this.roleService.editById(this.id, this.roles).subscribe((data: any) => {
      this.router.navigate(['/admin/role']);
      setTimeout(() => {
        window.location.reload();
      },0)
    }),(error: any)=>{
      console.log(error);
    }
  }

  OnSubmit() {
    this.EditById();
  }
}

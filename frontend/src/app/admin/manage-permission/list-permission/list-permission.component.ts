import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../service/permission-service.service';
import { Router } from '@angular/router';
import { Permission } from '../../../model/permission.model';

@Component({
  selector: 'app-list-permission',
  standalone:true,
  imports:[],
  templateUrl: './list-permission.component.html',
  styleUrl: './list-permission.component.scss'
})
export class ListPermissionComponent implements OnInit {

  permission!: Permission[];
item: any;
  constructor(private router: Router, private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.permissionService.getAllPermissions().subscribe((data: any) => {
      this.permission = data.result;
    }), (error: any) => {
      console.log(error);
    }
  }
}

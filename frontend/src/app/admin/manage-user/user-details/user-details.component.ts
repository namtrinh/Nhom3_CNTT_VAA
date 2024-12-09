import { Component } from '@angular/core';
import { UserService } from '../../../service/user-service.service';
import { User } from '../../../model/user.model';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { RolesService } from '../../../service/role-service.service';
import {DatePipe} from "@angular/common";
@Component({
  selector: 'app-user-details',
  standalone:true,
  imports: [RouterLink, DatePipe,],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  user: User = new User;
  public userid!: string;
  public detroyed!: any;
  imgAvatar!: string;

  constructor(private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.detroyed = this.router.params.subscribe((data: any) => {
      this.userid = data['user_id'];
      if (this.userid) {
        this.userService.getById(this.userid).subscribe((data: any) => {
          this.user = data.result;
          const imageName = data.result.avatar;

          this.getImageFromService(imageName);
        });
      }
    });
  }

  getImageFromService(imageName: string): void {
    this.userService.getImage(imageName).subscribe(data => {
      const blob = new Blob([data], { type: 'image/*' });
      this.imgAvatar = URL.createObjectURL(blob);
    });
    (error: any) => {
      console.error(error);
    }
  }

  ngOnDestroy() {
    this.detroyed.unsubscribe();
  }

}


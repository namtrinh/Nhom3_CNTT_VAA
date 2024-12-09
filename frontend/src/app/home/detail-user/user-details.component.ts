import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { User } from "../../model/user.model";
import { UserService } from "../../service/user-service.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'my-inf',
  standalone:true,
  imports:[RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class MyInfComponent implements OnInit {

  user: User = new User;
  public userid!: string;
  public detroyed!: any;

  constructor(private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.detroyed = this.router.params.subscribe((data: any) => {
      this.userid = data['user_id'];
      if (this.userid) {
        this.userService.getById(this.userid).subscribe((data: any) => {
          this.user = data.result;
        });
      }
    });
  }
}


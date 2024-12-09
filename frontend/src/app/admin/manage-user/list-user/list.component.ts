import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user.model';
import {UserService} from '../../../service/user-service.service';
import {EmailService} from '../../../service/email-service.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgxPaginationModule, FormsModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  user: User[] = [];
  page: number = 1;
  item_name: string = '';
  subject: string = 'FireFLy';
  text: string = 'hong co 1';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getList().subscribe((data: any) => {
      console.log(data.result)
      console.log(data.result.status)
      this.user = this.item_name
        ? data.result.filter((users: { username: string }) =>
          users.username.toLowerCase().includes(this.item_name.toLowerCase())
        )
        : data.result;
    });
  }

  deleteUser(user_id: string) {
    if (window.confirm("Are you sure want to delete this user ?")) {
      this.userService.deleteUser(user_id).subscribe(() => this.getUserList());
    }
  }
}

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
  clicksendmail: boolean = false;
  subject: string = 'FireFLy';
  text: string = 'hong co 1';

  constructor(private userService: UserService, private emailService: EmailService) {
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

  clickSendmail() {
    this.clicksendmail = true;
  }

  checkUncheckAll(evt: any) {
    this.user.forEach(user => user.selected = evt.target.checked);
  }

  h(evt: any, userId: string) {
    const isChecked = evt.target.checked;
    const user1 = this.user.find(u => u.user_id === userId);

    if (user1) {
      user1.selected = isChecked;
      console.log(user1);
    }
  }


  sendSelectedUsersEmail() {
    const selectedUsers = this.user.filter(user => user.selected);

    if (selectedUsers.length === 0) {
      console.log('No users selected.');
      return;
    }

    const emailAddresses = selectedUsers.map(user => user.email);
    this.emailService.sendmail(emailAddresses, this.subject, this.text).subscribe(
      response => console.log('Emails sent successfully:', response),
      error => console.error('Error sending emails:', error)
    );
  }
}

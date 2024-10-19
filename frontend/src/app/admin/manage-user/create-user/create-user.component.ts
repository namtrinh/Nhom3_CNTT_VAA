import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormGroup, FormsModule} from '@angular/forms';
import {UserService} from '../../../service/user-service.service';
import {OnInit} from '@angular/core';
import {User} from '../../../model/user.model';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {format} from 'date-fns';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  user: User = new User();

  constructor(private userService: UserService, private router: Router) {
  }

  createUser() {
    this.user.time_created = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    this.userService.createUser(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/admin/list-user']);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  OnSubmit() {
    this.createUser();
  }

}



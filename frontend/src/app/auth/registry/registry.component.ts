import {Component} from '@angular/core';
import {User} from '../../model/user.model';
import {UserService} from '../../service/user-service.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {format} from 'date-fns';

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.scss'
})
export class RegistryComponent {


  user: User = new User();
  message!: string;

  constructor(private userService: UserService, private router: Router) {
  }

  createUser() {
    this.user.time_created = format(new Date(), 'yyyy-MM-dd HH:mm:ss');


    this.userService.createUser(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this.message = e.error.message;
      }
    })
  }

  OnSubmit() {
    this.createUser();
  }

}





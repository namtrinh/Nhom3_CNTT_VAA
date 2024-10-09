import { Component } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'app-registry',
  standalone:true,
  imports:[FormsModule],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.scss'
})
export class RegistryComponent {

  user: User = new User();
  selectedFile: File | null = null;

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit() {
    
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  createUser() {
    this.user.time_created = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const formData = new FormData();
    formData.append('email', this.user.email);
    formData.append('username', this.user.username);
    formData.append('password', this.user.password);
    formData.append('time_created',this.user.time_created);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
  
    this.userService.createUser(formData).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  

  OnSubmit() {
    this.createUser();
    console.log(this.user);
  }
  
}



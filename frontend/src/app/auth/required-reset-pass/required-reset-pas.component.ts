import { Component } from '@angular/core';
import { AuthService } from "../auth.service";
import { FormsModule } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-required-reset-pas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './required-reset-pas.component.html',
  styleUrls: ['./required-reset-pas.component.css']
})
export class RequiredResetPasComponent {

  email!: string;
  message!: string;
  errorReset: boolean = true;

  constructor(private auth: AuthService,
              private router:Router) { }

  require() {
    this.auth.requiredUrl(this.email).subscribe(
       (data:any) => {
        this.errorReset = false;
        this.message = data.message;
         setTimeout(() => {
          this.router.navigate(['/login']);
        },4000)
    })
  }
}

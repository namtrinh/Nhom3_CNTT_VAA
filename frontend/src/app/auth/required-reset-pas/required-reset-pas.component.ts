import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-required-reset-pas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './required-reset-pas.component.html',
  styleUrl: './required-reset-pas.component.css'
})
export class RequiredResetPasComponent {

  email!: string;
  response!: string;

  constructor(private auth: AuthService, private activerouter: ActivatedRoute) {
  }

  require() {
    this.auth.requiredUrl(this.email).subscribe((data: any) => {
        alert("One url has been sent to your email");
      },
      error => {
        console.log(error)
      })
  }
}

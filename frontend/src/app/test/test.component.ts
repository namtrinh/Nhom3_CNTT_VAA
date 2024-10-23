import {Component, OnInit} from '@angular/core';
import {SharedDataService} from "../service/shared-data.service";
import {RouterLink} from "@angular/router";




@Component({
  selector: 'app-component-a',
  templateUrl: './test.component.html',
  standalone: true,
  imports: [
    RouterLink
  ]
})
export class TestComponent implements OnInit{
  constructor(private sharedDataService: SharedDataService) {}



  ngOnInit(): void {

  }
}

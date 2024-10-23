import { Component, OnInit } from '@angular/core';
import {SharedDataService} from "../service/shared-data.service";


@Component({
  selector: 'app-component-b',
  templateUrl: './test1.component.html',
  standalone: true
})
export class Test1Component implements OnInit {
  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    // Lắng nghe dữ liệu từ service
  }
}

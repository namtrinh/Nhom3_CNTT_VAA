import {Component, OnInit} from '@angular/core';
import {SharedDataService} from "../service/shared-data.service";
import {RouterLink} from "@angular/router";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-component-a',
  templateUrl: './test.component.html',
  standalone: true,
  imports: [
    RouterLink,
    BaseChartDirective
  ]
})
export class TestComponent {
  public barChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'];
  public barChartType: string = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81], label: 'Doanh thu'}
  ];
}

import { Component, OnInit } from '@angular/core';
import {  OrderService } from '../../../service/order-service.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { Order } from '../../../model/order.model';
import {RouterLink} from "@angular/router";
import {SharedDataService} from "../../../service/shared-data.service";

@Component({
  selector: 'app-list-invoice',
  standalone: true,
  imports: [NgxPaginationModule, RouterLink],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.scss'
})
export class ListOrderComponent implements OnInit {

  order:Order[] = []
  totalItems: number = 0;
  page: number = 0;
  size: number = 10;

  constructor(private orderService: OrderService,
              private sharedDataService:SharedDataService) { }

  ngOnInit(): void {
    this.loadInvoice();
  }

  loadInvoice(): void {
    this.orderService.getAll(this.page, this.size).subscribe(data => {
      this.order = data.result.content;
      console.log(data.result)
      this.totalItems = data.totalElements;
    });
  }

  sendData(data:any){
    this.sharedDataService.setData(data);
  }



  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadInvoice();
  }
}

import { Component, OnInit } from '@angular/core';
import {  OrderService } from '../../../service/order-service.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { Order } from '../../../model/order.model';

@Component({
  selector: 'app-list-invoice',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './list-invoice.component.html',
  styleUrl: './list-invoice.component.scss'
})
export class ListInvoiceComponent implements OnInit {

  order:Order[] = []
  totalItems: number = 0;
  page: number = 0;
  size: number = 10;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadInvoice();
  }

  loadInvoice(): void {
    this.orderService.getAll(this.page, this.size).subscribe(data => {
      this.order = data.result.content;
      this.totalItems = data.totalElements;
    }); (error: any) => {
      console.log(error);
    }
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadInvoice();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  OrderService } from '../../service/order-service.service';
import { Order } from '../../model/order.model';

import { FormsModule, NgForm } from '@angular/forms';
import { OrderDetailService } from '../../service/orderDetail-service.service';
import { Product } from '../../model/product.model';
import { Category } from '../../model/category.model';
import { format } from 'date-fns';
import { Promotion } from '../../model/promotion.model';
import { OrderDetail } from '../../model/order_detail.model';


@Component({
  selector: 'app-pay-success',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pay-success.component.html',
  styleUrl: './pay-success.component.scss'
})
export class PaySuccessComponent implements OnInit {

  orderId!: string;
  totalPrice!: number;
  paymentTime!: string;
  transactionId!: string;
  productID: any;
  order: Order = new Order();
  detailInvoice: OrderDetail = new OrderDetail();
  detail_id!: string;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private orderDetailService: OrderDetailService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || null;
      this.totalPrice = params['totalPrice'] || null;
      this.paymentTime = params['paymentTime'] || null;
      this.transactionId = params['transactionId'] || null;
      this.productID = localStorage.getItem('productId');
      console.log(this.productID);
    });

    this.createOrderDetail();
  }

  createOrder(detail_id: string) {
    this.order.payment_id = this.transactionId;
    this.order.time_created = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.order.order_detail.order_detail_id = detail_id;
    this.orderService.create(this.order).subscribe((data: any) => {
      console.log(data);
    })
  }

  createOrderDetail() {
    this.detailInvoice.total_price = this.totalPrice;
   
    this.detailInvoice.products = {
      product_id: this.productID
    }
    this.orderDetailService.create(this.detailInvoice).subscribe((data: any) => {
      const detail_id = data.result.detail_invoice_id;
      this.createOrder(detail_id);
    })
  }
}


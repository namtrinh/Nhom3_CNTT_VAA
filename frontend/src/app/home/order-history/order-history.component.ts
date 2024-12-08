import {Component, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {OrderService} from "../../service/order-service.service";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../model/order.model";
import {OrderDetailService} from "../../service/orderDetail-service.service";
import {OrderDetail} from "../../model/order_detail.model";
import {SwiperConfigInterface, SwiperModule} from "ngx-swiper-wrapper";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatListItem,
    MatList,
    CurrencyPipe,
    DatePipe,

  ],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  orderDetail: OrderDetail = new OrderDetail();
  hiddenDetail!: [orderDetailId: number];
  selectedOrderDetailId: any;

  swiperConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };

  constructor(
    private orderService: OrderService,
    private activeRoute: ActivatedRoute,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
    const userId = this.activeRoute.snapshot.params['user_id'];
    if (userId) {
      this.getByUser(userId);
    }
  }

  getByUser(userId: string): void {
    this.orderService.findAllByUser(userId).subscribe((data: any) => {
      this.orders = data.result;
    });
  }

  getOrderDetail(orderDetailId: string): void {
    if (this.selectedOrderDetailId === orderDetailId) {
      this.selectedOrderDetailId = null;
      this.orderDetail = new OrderDetail();
    } else {
      this.selectedOrderDetailId = orderDetailId;
      this.orderDetailService.getById(orderDetailId).subscribe((data: any) => {
        this.orderDetail = data.result;
      });
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe, DecimalPipe} from "@angular/common";
import {OrderService} from "../../service/order-service.service";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../model/order.model";
import {OrderDetailService} from "../../service/orderDetail-service.service";
import {OrderDetail} from "../../model/order_detail.model";
import {SwiperConfigInterface, SwiperModule} from "ngx-swiper-wrapper";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {OrderDetailProductService} from "../../service/orderDetailProduct-service.service";
import {OrderDetailProduct} from "../../model/order_detail_product.model";

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
    DecimalPipe,

  ],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  orderDetail: OrderDetail = new OrderDetail();
  hiddenDetail!: [orderDetailId: number];
  selectedOrderDetailId: any;
  orderDetailProduct: OrderDetailProduct[] = [];
  subTotalPrice: number = 0;
  totalPriceSale: number = 0;
  finalTotalPrice:number = 0;

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
    private orderDetailService: OrderDetailService,
    private orderDetailProductService: OrderDetailProductService
  ) {
  }

  ngOnInit(): void {
    const userId = this.activeRoute.snapshot.params['user_id'];
    if (userId) {
      this.getByUser(userId);
    }
  }

  getByUser(userId: string): void {
    this.orderService.findAllByUser(userId).subscribe((data: any) => {
      this.orders = data.result;
      this.orderDetailService.getById
    });
  }

  getOrderDetail(orderDetailId: string): void {
    if (this.selectedOrderDetailId === orderDetailId) {
      this.selectedOrderDetailId = null;
      this.orderDetail = new OrderDetail();
    } else {
      this.selectedOrderDetailId = orderDetailId;
      this.subTotalPrice = 0;
      this.totalPriceSale = 0;
      this.finalTotalPrice = 0;
      this.orderDetailProductService.findByOrderDetailId(orderDetailId).subscribe((data: any) => {
        this.orderDetailProduct = data.result;
        this.orderDetailProduct.forEach(data => {
          if (data.products_product_id.price !== undefined) {
            this.subTotalPrice += data.products_product_id.price * data.quantity;
            this.totalPriceSale += data.products_product_id.price * data.quantity * (data.discount / 100);
            this.finalTotalPrice += (data.products_product_id.price * (1 - data.discount / 100)) * data.quantity;
          }
        });
      });
    }
  }

}

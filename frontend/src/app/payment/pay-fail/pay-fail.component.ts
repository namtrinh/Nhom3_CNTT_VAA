import {Component, OnInit} from '@angular/core';
import {VNPayService} from '../../service/payment-service.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Order} from "../../model/order.model";
import {OrderDetail} from "../../model/order_detail.model";
import {User} from "../../model/user.model";
import {Product} from "../../model/product.model";
import {Promotion} from "../../model/promotion.model";
import {OrderService} from "../../service/order-service.service";
import {OrderDetailService} from "../../service/orderDetail-service.service";
import {format} from "date-fns";
import {Category} from "../../model/category.model";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-pay-fail',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './pay-fail.component.html',
  styleUrl: './pay-fail.component.scss'
})
export class PayFailComponent implements OnInit {
  orderId!: string;
  totalPrice!: number;
  paymentTime!: string;
  transactionId!: string;
  order: Order = new Order();
  orderDetail: OrderDetail = new OrderDetail();
  user: User = new User();
  selectedProduct: any

  product: Product[] = [];
  promotion: Promotion[] = [];
  userInf: Order = new Order();

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private orderDetailService: OrderDetailService) {
  }

  // Thanh toán thất bại
  // vẫn tạo hóa đơn với trạng thái là canceled

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || null;
      this.totalPrice = params['totalPrice'] || null;
      this.paymentTime = params['paymentTime'] || null;
      this.transactionId = params['transactionId'] || null;

      const storedArray = sessionStorage.getItem('myArray');
      this.selectedProduct = storedArray ? JSON.parse(storedArray) : {
        products: [], user: {}, promotions: [], totalPrice: 0,
        totalQuantityProduct: 0
      };
      this.user = this.selectedProduct.user;
      this.product = this.selectedProduct.products;
      console.log(this.product);

      this.userInf = this.selectedProduct.userInf;
      console.log(this.userInf);
      // this.promotion = this.selectedProduct.promotions;

      this.createOrderDetail();
    });
  }

  createOrder(detail_id: string) {
    this.order.payment_id = this.transactionId;
    this.order.time_created = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.order.orderDetail_id = detail_id;
    this.order.address = this.user.address;
    this.order.user = {
      user_id: this.user.user_id,
    };
    this.order.username = this.userInf.username;
    this.order.email = this.userInf.email;
    this.order.phoneNumber = this.userInf.phoneNumber;
    this.order.address = this.userInf.address;
    this.order.status = 'Cancelled';
    this.orderService.create(this.order).subscribe((data: any) => {
      console.log(data.result);
      sessionStorage.removeItem("myArray");
    });
  }

  createOrderDetail() {
    this.orderDetail.total_amount = this.selectedProduct.totalQuantityProduct;
    this.orderDetail.total_price = this.selectedProduct.totalPrice;

    this.orderDetail.products = this.product
    console.log(this.orderDetail.products);
    const updatedProducts: Product[] = [];
    this.orderDetail.products?.forEach((selectedProduct: any) => {
      if (selectedProduct.product) {
        const newProduct: Product = {
          category: new Category(),
          description: '',
          image: '',
          name: '',
          price: 0,
          promotion: new Promotion(),
          quantity: 0,
          selected: false,
          seotitle: '',
          time_created: '',
          stockStatus: 'In_Stock',
          totalRating:0,
          product_id: selectedProduct.product,
        };
        updatedProducts.push(newProduct);
      }
    });
    this.orderDetail.products = updatedProducts;
    this.orderDetailService.create(this.orderDetail).subscribe((data: any) => {
      const detail_id = data.result.order_detail_id;
      this.createOrder(detail_id);
    });
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Order} from '../../model/order.model';
import {FormsModule} from '@angular/forms';
import {Product} from '../../model/product.model';
import {Category} from '../../model/category.model';
import {format} from 'date-fns';
import {Promotion} from '../../model/promotion.model';
import {OrderDetail} from '../../model/order_detail.model';
import {OrderService} from "../../service/order-service.service";
import {OrderDetailService} from "../../service/orderDetail-service.service";
import {SharedDataService} from "../../service/shared-data.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-pay-success',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.scss']
})
export class PaySuccessComponent implements OnInit {
  orderId!: string;
  totalPrice!: number;
  paymentTime!: string;
  transactionId!: string;
  order: Order = new Order();
  orderDetail: OrderDetail = new OrderDetail();
  user: User = new User();
  totalQuantity!: number;
  selectedProduct: any

  product: Product[] = [];

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private sharedDataService: SharedDataService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || null;
      this.totalPrice = params['totalPrice'] || null;
      this.paymentTime = params['paymentTime'] || null;
      this.transactionId = params['transactionId'] || null;

      const storedArray = localStorage.getItem('myArray');
      this.selectedProduct = storedArray ? JSON.parse(storedArray) : {products: [], user: {}};


      this.user = this.selectedProduct.user;
      this.product = this.selectedProduct.products
      //   this.totalQuantity = this.orderDetail.products.reduce((sum, product) => sum + product.quantity, 0);

      console.log('sp', this.product)
      console.log('Người dùng:', this.user);

      this.createOrderDetail();
    });
  }

  createOrder(detail_id: string) {
    this.order.payment_id = this.transactionId;
    this.order.time_created = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.order.orderDetail.order_detail_id = detail_id;
    this.order.address = this.user.address;
    this.order.user = {
      user_id: this.user.user_id,
    };
    this.orderService.create(this.order).subscribe((data: any) => {
      console.log(data);
      // localStorage.removeItem('selectedProducts'); // Bạn có thể xóa nếu không cần giữ lại
    });
  }

  createOrderDetail() {
    this.orderDetail.total_amount = this.totalQuantity;
    this.orderDetail.total_price = this.totalPrice;

    this.orderDetail.products = this.product
    console.log(this.orderDetail.products);

    const updatedProducts: Product[] = [];

    this.orderDetail.products?.forEach((selectedProduct: any) => {
      // Kiểm tra xem selectedProduct và selectedProduct.product có tồn tại không
      if (selectedProduct.product && selectedProduct.product.product_id) {
        console.log('Product found:', selectedProduct);

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
          product_id: selectedProduct.product.product_id, // Gán giá trị product_id từ selectedProduct
        };

        // Thêm sản phẩm mới vào mảng tạm thời
        updatedProducts.push(newProduct);
      } else {
        console.error('selectedProduct hoặc product_id không hợp lệ', selectedProduct);
      }
    });

    // Gán danh sách sản phẩm đã cập nhật vào orderDetail.products
    this.orderDetail.products = updatedProducts;

    // Tiến hành tạo chi tiết đơn hàng
    this.orderDetailService.create(this.orderDetail).subscribe((data: any) => {
      const detail_id = data.result.order_detail_id;
      this.createOrder(detail_id);
    });
  }

}

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
import {CurrencyPipe, DecimalPipe} from "@angular/common";
import {ProductService} from "../../service/product-service.service";
import {HttpClient} from "@angular/common/http";
import {OrderDetailProduct} from "../../model/order_detail_product.model";
import {OrderDetailProductService} from "../../service/orderDetailProduct-service.service";

@Component({
  selector: 'app-pay-success',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, DecimalPipe],
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.scss']
})
export class PaySuccessComponent implements OnInit {
  orderInf!: string;
  totalPrice!: number;
  paymentTime!: string;
  transactionId!: string;
  order: Order = new Order();
  orderDetail: OrderDetail = new OrderDetail();
  user: User = new User();
  selectedProduct: any;
  updateProduct: Product = new Product();
  decreateQuantity!: number;
  product: Product[] = [];
  promotion: Promotion[] = [];
  userInf: Order = new Order();
  orderDetailProduct: OrderDetailProduct = new OrderDetailProduct();

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private productService: ProductService,
              private http: HttpClient,
              private orderDetailProductService: OrderDetailProductService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderInf = params['orderId'] || null;
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
      this.userInf = this.selectedProduct.userInf;
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
    this.order.status = 'Completed';
    this.orderService.create(this.order).subscribe((data: any) => {
      this.sendEmail();
       sessionStorage.removeItem("myArray");
    });
  }

  // Khởi tao chi tiết hóa đơn
  createOrderDetail() {
    this.orderDetail.total_amount = this.selectedProduct.totalQuantityProduct;
    this.orderDetail.total_price = this.selectedProduct.totalPrice;
    this.orderDetail.products = this.product
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
          totalRating: 0,
          product_id: selectedProduct.product,
        };
        updatedProducts.push(newProduct);
      }
    });
    this.orderDetail.products = updatedProducts;
    this.updateQuantityProduct();
    this.orderDetailService.create(this.orderDetail).subscribe((data: any) => {
      const detail_id = data.result.order_detail_id;
      this.createOrder(detail_id);
      this.updateQuantityDiscount(detail_id)
    });
  }

  //Cập nhật số lượng sản phẩm
  updateQuantityProduct() {
    this.product.forEach((item: any) => {
      this.productService.getById(item.product).subscribe((data: any) => {
        this.updateProduct = data.result;
        this.decreateQuantity = this.updateProduct.quantity - item.quantity;
        const formData = new FormData();
        formData.append('quantity', this.decreateQuantity.toString())
        formData.append('name', this.updateProduct.name);
        formData.append('seotitle', this.updateProduct.seotitle)
        formData.append('quantity', this.decreateQuantity.toString());
        formData.append('price', this.updateProduct.price.toString());
        formData.append('description', this.updateProduct.description);
        formData.append('category', this.updateProduct.category.category_id.toString());
        if (this.updateProduct.promotion && this.updateProduct.promotion.promotion_id !== null) {
          formData.append('promotion', this.updateProduct.promotion.promotion_id.toString());
        }
        formData.append('image', this.updateProduct.image)
        formData.append('stock_stastus', "In_Stock")
        this.productService.editById(item.product, formData).subscribe((data: any) => {
        })
      })
    })
  }

  sendEmail() {
    const emailData = {
      email: this.userInf.email,
      orderInf: this.orderInf,
      totalPrice: this.selectedProduct.totalPrice,
      paymentTime: new Date().toLocaleString(),
      transactionId: this.transactionId,
    };
    console.log(this.userInf.email);
    this.http.post('http://localhost:8888/identity/email/send', emailData).subscribe(
      (response) => {
      });
  }

  // cập nhật giá hiện tại và số lượng từng sản phẩm
  updateQuantityDiscount(orderDetailId: string) {
    this.product.forEach((item: any) => {
        this.productService.getById(item.product).subscribe((data: any) => {
          this.orderDetailProduct.discount = item.discount;
          this.orderDetailProduct.price = data.result.price * (1 - (item.discount / 100));
          this.orderDetailProduct.quantity = item.quantity;
          this.orderDetailProductService.getById(orderDetailId, item.product, this.orderDetailProduct).subscribe((data: any) => {
          })
        })
      }
    )
  }
}

import {Component, OnInit} from '@angular/core';
import {CartService} from '../../service/cart-service.service';
import {jwtDecode} from 'jwt-decode';
import {Cart} from '../../model/cart.model';
import {Product} from '../../model/product.model';
import {FormsModule} from '@angular/forms';
import {ImageService} from '../../service/img-service.service';
import {CommonModule} from '@angular/common';
import {VNPayService} from "../../service/payment-service.service";
import {Router, RouterLink} from "@angular/router";
import {Order} from "../../model/order.model";
import {ProductService} from "../../service/product-service.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
              private paymentService: VNPayService,
              private productService: ProductService) {
  }

  cart: Cart[] = [];
  user_Id!: string;
  product!: number;
  totalPrice!: number;
  item: any;
  maxQuantity: number = 10;
  OrderItem: Order = new Order();
  totalQuantityProduct!: number
  selectedProducts: any[] = [];
  countProduct!: number;
  productCheck: Product = new Product();
  checkQuantityPr: boolean = false;

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decodeToken = jwtDecode(token) as any;
      this.user_Id = decodeToken.userId;
    }
    this.getAllByUserId();
  }

  payment() {
    if (this.selectedProducts.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
      return;
    }

    this.paymentService.submitOrder(this.totalPrice, 'Order include product had been selected').subscribe((data: any) => {
      const urlPayment = data.vnpayUrl;

      console.log(this.totalPrice)
      window.location.href = urlPayment;
      sessionStorage.setItem('myArray', JSON.stringify({
          user: this.selectedProducts[0].user,
          totalPrice: this.totalPrice,
          totalQuantityProduct: this.totalQuantityProduct,
          userInf: {
            username: this.OrderItem.username,
            phoneNumber: this.OrderItem.phoneNumber,
            email: this.OrderItem.email,
            address: this.OrderItem.address + this.ward + this.district + this.city
          },
          products: this.selectedProducts.map(cart => {
            return ({
              product: cart.product.product_id,
              quantity: cart.product_quantity
            });
          }),
        }
      ));
    });
  }

  getAllByUserId() {
    this.cartService.getByUserId(this.user_Id).subscribe((data: any) => {
      this.cart = data.result;
    })
  }

  increaseQuantity(carts: Cart) {
    if (carts.product_quantity < this.maxQuantity) {
      carts.product_quantity++;
      this.updateCart(carts);
      this.updateTotalPrice()
    }
  }

  decreaseQuantity(carts: Cart) {
    if (carts.product_quantity > 1) {
      carts.product_quantity--;
      this.updateCart(carts);
      this.updateTotalPrice()
    }
  }

  deleteCart(cart_id: string) {
    if (window.confirm("Are you sure you want to delete this cart")) {
      this.cartService.delete(cart_id).subscribe(() => this.getAllByUserId());
    }
  }

  updateCart(carts: Cart) {
    this.cartService.updateCart(carts.cart_id, carts).subscribe(data => {
    });
  }


  toggleSelection(cart: any): void {
    if (cart.selected) {
      this.selectedProducts.push(cart);
      console.log(this.selectedProducts)
    } else {
      this.selectedProducts = this.selectedProducts.filter(item => item.cart_id !== cart.cart_id);
    }
    this.countProduct = this.selectedProducts.length;
    this.updateTotalPrice()
  }


  updateTotalPrice(): void {
    this.totalPrice = this.selectedProducts.reduce((sum, selectedCart) => {
      return sum + (selectedCart.product_quantity * selectedCart.product.price);
    }, 0);

    this.totalQuantityProduct = this.selectedProducts.reduce((sum, selectedCart) => {
      return sum + selectedCart.product_quantity;
    }, 0);
  }

  checkCount: boolean = false;
  city: any;
  district: any;
  ward: any;

  paymentNow(): void {
    if (this.selectedProducts.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
      this.checkCount = false;
    } else {
      this.checkCount = true;
      this.selectedProducts.forEach((item: any) => {
        this.productService.getById(item.product.product_id).subscribe((data: any) => {
          this.productCheck = data.result;
          if (item.product_quantity > this.productCheck.quantity) {
            this.checkCount = false;
            alert(`Product with name: ${item.product.name} is not enought stock to implement this transaction !`);
          }
        })
      })
    }
  }
}

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
import {SharedDataService} from "../../service/shared-data.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
              private imgService: ImageService,
              private paymentService: VNPayService,
              private sharedDataService: SharedDataService,
              private router: Router) {
  }

  cart: Cart[] = [];
  user_Id!: string;
  product!: number;
  totalPrice!: number;
  item: any;
  maxQuantity: number = 10;
  imgAvatars: { [key: string]: string } = {};
  carts!: Cart;
  totalQuantityProduct!: number
  selectedProducts: any[] = [];
  countProduct!: number;
  priceSale!:number | undefined

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
    console.log(this.totalPrice)
    this.paymentService.submitOrder(this.totalPrice, 'Sản phẩm đã chọn').subscribe((data: any) => {
      const urlPayment = data.vnpayUrl;
      window.location.href = urlPayment;
      sessionStorage.setItem('myArray', JSON.stringify({
          user: this.selectedProducts[0].user,
          totalPrice: this.totalPrice,
          totalQuantityProduct: this.totalQuantityProduct,
          products: this.selectedProducts.map(cart => {
            return ({
              product: cart.product
            });
          }),
        }
      ));
      console.log(sessionStorage.getItem('myArray'))
    });
  }


  getAllByUserId() {
    this.cartService.getByUserId(this.user_Id).subscribe((data: any) => {
      this.cart = data.result;
      this.cart.forEach((cart) => {
        this.getImageFromService(cart.product.image, cart.cart_id)
      })
    })
  }

  private getImageFromService(imageName: any, product_id: string): void {
    if (imageName) {
      this.imgService.getImage(imageName).subscribe(
        (data: any) => {
          const blob = new Blob([data], {type: 'image/*'});
          this.imgAvatars[product_id] = URL.createObjectURL(blob);
        },
        error => {
          console.log(error);
        });
    } else {
    }
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
      console.log(cart_id)
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
    } else {
      this.selectedProducts = this.selectedProducts.filter(item => item.cart_id !== cart.cart_id);
    }
    this.countProduct = this.selectedProducts.length;
    this.updateTotalPrice()
  }


  updateTotalPrice(): void {
    this.totalPrice = this.selectedProducts.reduce((sum, selectedCart) => {
      return sum + (selectedCart.product_quantity * selectedCart.product_price);
    }, 0);

    this.totalQuantityProduct = this.selectedProducts.reduce((sum, selectedCart) => {
      return sum + selectedCart.product_quantity;
    }, 0);
  }
}

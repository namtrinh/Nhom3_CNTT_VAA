import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart-service.service';
import { jwtDecode } from 'jwt-decode';
import { Cart } from '../../model/cart.model';
import { Product } from '../../model/product.model';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../../service/img-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private imgService: ImageService) { }

  cart: Cart[] = [];
  user_Id!: string;
  product!: number;
  carts: Cart = new Cart();
  item: any;
  maxQuantity: number = 10;
  imgAvatars: { [key: string]: string } = {};

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decodeToken = jwtDecode(token) as any;
      this.user_Id = decodeToken.userId;
    }
    this.getAllByUserId();
  }

  getAllByUserId() {
    {
      this.cartService.getByUserId(this.user_Id).subscribe((data: any) => {
        this.cart = data.result;
        this.cart.forEach((cart) => {
          this.getImageFromService(cart.product.image, cart.cart_id)
        })
      })
    }
  }

  private getImageFromService(imageName: any, product_id: string): void {
    if (imageName) {
      this.imgService.getImage(imageName).subscribe(
        (data: any) => {
          const blob = new Blob([data], { type: 'image/*' });
          this.imgAvatars[product_id] = URL.createObjectURL(blob);
        },
        error => {
          console.log(error);
        });
    } else { }
  }


  increaseQuantity(carts: Cart) {
    if (carts.product_quantity < this.maxQuantity) {
      carts.product_quantity++;
      this.updateCart(carts);
    }
  }

  decreaseQuantity(carts: Cart) {
    if (carts.product_quantity > 1) {
      carts.product_quantity--;
      this.updateCart(carts);
    }
  }

  deleteCart(cart_id:string){
    console.log(cart_id)
    this.cartService.delete(cart_id).subscribe(() => this.getAllByUserId());
  }

  updateCart(carts: Cart) {
    this.cartService.updateCart(carts.cart_id, carts).subscribe(data => { });
  }
}

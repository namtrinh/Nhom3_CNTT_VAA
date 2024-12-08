import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product-service.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Product} from '../../model/product.model';
import {FormsModule} from '@angular/forms';
import {VNPayService} from '../../service/payment-service.service';
import {ImageService} from '../../service/img-service.service';
import {CommonModule} from '@angular/common';
import {CartService} from '../../service/cart-service.service';
import {Cart} from '../../model/cart.model';
import {format} from 'date-fns';
import {jwtDecode} from 'jwt-decode';
import {ReviewProductComponent} from "../review-product/review-product.component";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {CategoryService} from "../../service/categoy-service.service";

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReviewProductComponent, MatCard, MatCardHeader, MatCardContent, MatCardActions],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  quantity: number = 1;
  inf!: string;
  seo!: string;
  product: Product = new Product();
  cart: Cart = new Cart();
  isVisible: boolean = false;
  imageUrl!:string;
  products:Product[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private Activeroute: ActivatedRoute,
    private categoryService:CategoryService
  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getBySeotitle();
  }

  getBySeotitle() {
    this.seo = this.Activeroute.snapshot.params['seotitle'];
    this.productService.getBySeoTitle(this.seo).subscribe((data: any) => {
      this.product = data.result;
      this.getByCategory()
       console.log(this.product.product_id)
      if (this.product && this.product.product_id) {
        this.imageUrl = this.product.image;
      }
    });
  }

  addToCart(productId:string) {
    const token = localStorage.getItem('auth_token') as string;
    const decodedToken = jwtDecode(token) as any;
    const user_Id = decodedToken.userId;
    this.cart.time_add = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (this.product.promotion && this.product.promotion.discount) {
      this.cart.product_price = this.product.price - (this.product.price * this.product.promotion.discount / 100);
    }else{
      this.cart.product_price = this.product.price;
    }
    this.cart.product_quantity = this.quantity;
    this.cart.product = {
      product_id: productId
    };
    this.cart.user = {
      user_id: user_Id
    };
    this.cartService.addToCart(this.cart).subscribe((data: any) => {
      this.showToast();
    }, (error: any) => {
      console.error('Error adding to cart:', error);
    });
  }

  getByCategory(){
    if (this.product.category.ct_seotitle) {
      this.categoryService.getBySeoTitle(this.product.category.ct_seotitle).subscribe((data: any) => {
        this.products = data.result.products;
      })
    }
  }

  showToast() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }
}


import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../service/product-service.service';
import { Product } from '../../model/product.model';
import { ImageService } from '../../service/img-service.service';
import { Category } from '../../model/category.model';
import { CommonModule } from '@angular/common';
import { ProductExtendComponent } from "../product-extend/product-extend.component";
import { PromotionService } from '../../service/promotion-service.service';
import {ProductCategoryComponent} from "../product-category/product-category.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductExtendComponent, ProductCategoryComponent],
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.scss'
})
export class ProductSaleComponent implements OnInit {
  products: Partial<Product>[] = [];
  category: Category[] = [];
  imgLeft: string = '';
  imgRight: string = '';
  private intervalId: any;
  imageUrl!:string;

  constructor(private router: Router,
    private productService: ProductService,
    private imgService: ImageService,

    private promotionService: PromotionService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.imgLeft = this.images[this.index];
    this.isActive = true;
    this.loadImg();
  }
  isActive: boolean = false;
  images: string[] = ['/assets/douple-1.png', '/assets/douple-2.png', '/assets/douple-3.png' ];
  index: number = 0;

  loadImg() {
    this.intervalId = setInterval(() => {
      this.isActive = false;
      setTimeout(() => {
        this.index = (this.index + 1) % this.images.length;
        this.imgLeft = this.images[this.index];
        this.isActive = true;
      }, 400);
    }, 5000);
  }

  getAllProducts() {
    this.productService.findAllProductsWithPromotion().subscribe((data: any) => {
      this.products = data.result;
      this.products.forEach((product) => {
      });
    })
  }
}

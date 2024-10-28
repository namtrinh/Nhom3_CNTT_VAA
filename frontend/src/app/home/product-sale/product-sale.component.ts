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
  sale!: number;
  products: Partial<Product>[] = [];
  category: Category[] = [];
  imgAvatars: { [key: string]: string } = {};
  imgLeft: string = '';
  imgRight: string = '';
  private intervalId: any;
  constructor(private router: Router,
    private productService: ProductService,
    private imgService: ImageService,
    private promotionService: PromotionService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.loadImg();
  }

  loadImg() {
    const images_left = ['/assets/douple-1.png', '/assets/douple-2.png'];
    const images_right = ['/assets/douple-2.png', '/assets/douple-1.png'];
    let index = 0;

    // Chuyển đổi hình ảnh mỗi 2 giây
    this.intervalId = setInterval(() => {
      this.imgLeft = images_left[index];
      this.imgRight = images_right[index];

      // Cập nhật chỉ số cho lần lặp tiếp theo
      index = (index + 1) % images_left.length; // Quay lại từ đầu khi đến cuối mảng
    }, 2000);
  }


  getAllProducts() {
    this.productService.findAllProductsWithPromotion().subscribe((data: any) => {
      this.products = data.result;
      this.products.forEach((product) => {
        if (product.image && product.product_id) {
          this.getImageFromService(product.image, product.product_id);
        }
      });
    })
  }

  private getImageFromService(imageName: string, product_id: string): void {
    if (imageName !== null && imageName !== undefined) {
      this.imgService.getImage(imageName).subscribe(
        (data: any) => {
          const blob = new Blob([data], { type: 'image/*' });
          this.imgAvatars[product_id] = URL.createObjectURL(blob);
        },
        (error) => {
          console.error(error);
        });
    } else { }
  }

}

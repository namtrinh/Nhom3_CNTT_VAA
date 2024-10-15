import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../service/product-service.service';
import { Product } from '../../model/product.model';
import { ImageService } from '../../service/img-service.service';
import { Category } from '../../model/category.model';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProductExtendComponent } from "../product-extend/product-extend.component";
import { PromotionService } from '../../service/promotion-service.service';
import { Promotion } from '../../model/promotion.model';
import { DataService } from '../../service/data-service.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductExtendComponent],
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.scss'
})
export class ProductSaleComponent implements OnInit {
  sale!: number;
  product: Partial<Product>[] = [];
  category: Category[] = [];
  promotions: Promotion[] = [];

  imgAvatars: { [key: string]: string } = {};
  constructor(private router: Router,
    private productService: ProductService,
    private imgService: ImageService,
    private promotionService: PromotionService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.promotionService.getAll().subscribe((data: any) => {
      this.promotions = data.result;
      this.product = this.promotions.map(promotions => promotions.product);
      this.product.forEach((product) => {
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

  goToProductDetail(promotion:Promotion) {
    this.dataService.changeData(promotion); // Gửi dữ liệu sản phẩm đến DataService
    this.router.navigate(['/detail-product', promotion.product.seotitle]);
  }
}

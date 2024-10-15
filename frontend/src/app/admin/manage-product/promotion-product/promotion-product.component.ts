import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../service/product-service.service';
import { RouterLink } from '@angular/router';
import { ImageService } from '../../../service/img-service.service';
import { CommonModule } from '@angular/common';
import { Promotion } from '../../../model/promotion.model';
import { PromotionService } from '../../../service/promotion-service.service';

@Component({
  selector: 'app-promotion-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './promotion-product.component.html',
  styleUrl: './promotion-product.component.scss'
})
export class PromotionProductComponent implements OnInit {
  product: any;

  constructor(private productService: ProductService,
    private imgService: ImageService,
    private promotionService: PromotionService,) { }

  imgAvatars: { [key: string]: string } = {};
  products: Product[] = []
  promotion: Promotion = new Promotion
  ngOnInit(): void {
    this.getAllwithPromotion()
  }

  getAllwithPromotion() {
    this.productService.findAllProductsWithPromotion().subscribe((data: any) => {
      this.products = data.result;
      console.log(this.products);
      this.products.forEach((products) => {
        this.getImageFromService(products.image, products.product_id);
      })
    })
  }

  private getImageFromService(imageName: string, product_id: string): void {
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

  delete(promotion_id:string) {
    this.promotionService.deleteById(promotion_id).subscribe(
      (data: any) => {
        this.getAllwithPromotion();
      });
  }
}


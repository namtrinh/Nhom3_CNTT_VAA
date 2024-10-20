import {Component, OnInit} from '@angular/core';
import {Product} from '../../../model/product.model';
import {ProductService} from '../../../service/product-service.service';
import {RouterLink} from '@angular/router';
import {ImageService} from '../../../service/img-service.service';
import {CommonModule} from '@angular/common';
import {Promotion} from '../../../model/promotion.model';
import {PromotionService} from '../../../service/promotion-service.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-promotion-product',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './promotion-product.component.html',
  styleUrl: './promotion-product.component.scss'
})
export class PromotionProductComponent implements OnInit {
  product: any;
  selectedPromotionId: string = '';
  imgAvatars: { [key: string]: string } = {};
  products: Product[] = []
  promotion: Promotion[] = []

  constructor(private productService: ProductService,
              private imgService: ImageService,
              private promotionService: PromotionService,) {
  }

  ngOnInit(): void {
    this.getPromotion()
    this.filterProducts()
  }

  filterProducts() {
    this.productService.findAllProductsWithPromotion().subscribe((data: any) => {
      if (this.selectedPromotionId) {
        this.products = data.result.filter((product: Product) => product.promotion?.promotion_id === this.selectedPromotionId);
        this.products.forEach((products) => {
          this.getImageFromService(products.image, products.product_id);
        })
      } else {
        this.products = data.result;
        this.products.forEach((products) => {
          this.getImageFromService(products.image, products.product_id);
        })
      }
    })
  }

  private getImageFromService(imageName: string, product_id: string): void {
    if (imageName) {
      this.imgService.getImage(imageName).subscribe(
        (data: any) => {
          const blob = new Blob([data], {type: 'image/*'});
          this.imgAvatars[product_id] = URL.createObjectURL(blob);
        })
    }
  }

  getPromotion() {
    this.promotionService.getAll().subscribe((data: any) => {
      this.promotion = data.result;
    })
  }

}


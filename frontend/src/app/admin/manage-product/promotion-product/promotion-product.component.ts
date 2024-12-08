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
  promotion: Promotion[] = [];
  imageUrl!:string;

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
      } else {
        this.products = data.result;
      }
    })
  }

  getPromotion() {
    this.promotionService.getAll().subscribe((data: any) => {
      this.promotion = data.result;
    })
  }
}


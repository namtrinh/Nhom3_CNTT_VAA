import {Component, OnInit} from '@angular/core';
import {Product} from '../../../model/product.model';
import {ProductService} from '../../../service/product-service.service';
import {RouterLink} from '@angular/router';
import {ImageService} from '../../../service/img-service.service';
import {CommonModule} from '@angular/common';
import {Promotion} from '../../../model/promotion.model';
import {PromotionService} from '../../../service/promotion-service.service';

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
              private promotionService: PromotionService,) {
  }

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
          const blob = new Blob([data], {type: 'image/*'});
          this.imgAvatars[product_id] = URL.createObjectURL(blob);
        },
        error => {
          console.log(error);
        });
    } else {
    }
  }

  delete(product_id: string) {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('quantity', this.product.quantity.toString());
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    if (this.product.category?.category_id) {
      formData.append('category', this.product.category.category_id.toString());
    }
    if (this.product.promotion.promotion_id) {
      formData.append('promotion', 'null')
    }

    console.log(this.product.promotion.promotion_id)


    this.productService.editById(product_id, formData).subscribe(
      (data: any) => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}


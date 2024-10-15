import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product-service.service';
import { Product } from '../../model/product.model';
import { ImageService } from '../../service/img-service.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-extend',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-extend.component.html',
  styleUrl: './product-extend.component.scss'
})
export class ProductExtendComponent implements OnInit {

  products: Product[] = [];
  totalItems: number = 0;
  page: number = 0;
  size: number = 2;
  imgAvatars: { [key: string]: string } = {};

  constructor(private productService: ProductService, private imgService: ImageService, private router: Router) { }

  ngOnInit(): void {
    this.getAlll();
  }

  loadProducts(): void {
    this.productService.getProducts(this.page, this.size).subscribe(response => {
      this.products = response.content;
      this.totalItems = response.totalElements;
    });
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadProducts();
  }

  getAlll() {
    this.productService.findAllProductsWithoutPromotion().subscribe((data: any) => {
      this.products = data.result;
      this.products.forEach((product) => {
        this.getImageFromService(product.image, product.product_id)
      })
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

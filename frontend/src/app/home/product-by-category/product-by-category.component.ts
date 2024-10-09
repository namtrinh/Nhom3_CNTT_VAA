import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { Category } from '../../model/category.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product-service.service';
import { ImageService } from '../../service/img-service.service';

@Component({
  selector: 'app-product-by-category',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.scss']
})
export class ProductByCategoryComponent implements OnInit {
  products: any;
  product!: Product[];
  category: Category[] = [];
  imgAvatars: { [key: string]: string } = {};
  category_id!: number;
  constructor(private router: Router, private productService: ProductService,
    private imgService: ImageService, private active: ActivatedRoute) { }

  ngOnInit(): void {
    // Only load data if it hasn't been loaded yet
    this.active.paramMap.subscribe((params) => {
      const categoryId = Number(params.get('category_id'));
      this.category_id = categoryId;
      console.log('Category ID:', this.category_id);
      this.getAllProduct(this.category_id);
      // Set the flag to true after loading data
    });
  }

  getAllProduct(category_id: number) {
    // Check category_id
    if (category_id === 0) {
      this.productService.getAll().subscribe((data: any) => {
        this.product = data.result;
        this.product.forEach((product) => {
          this.getImageFromService(product.image, product.product_id);
        });
      });
    } else {
      this.productService.getProductByCategory(category_id).subscribe((data: any) => {
        this.product = data.result;
        this.product.forEach((product) => {
          this.getImageFromService(product.image, product.product_id);
        });
      });
    }
  }

  private getImageFromService(imageName: string, product_id: string): void {
    if (imageName) {
      this.imgService.getImage(imageName).subscribe(
        (data: any) => {
          const blob = new Blob([data], { type: 'image/*' });
          this.imgAvatars[product_id] = URL.createObjectURL(blob);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}

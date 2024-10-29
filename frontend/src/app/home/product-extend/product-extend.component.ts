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
  size: number = 5;
  imgAvatars: { [key: string]: string } = {};
  showResetButton: boolean = false; // Track the visibility of the reset button

  constructor(private productService: ProductService, private imgService: ImageService, private router: Router) { }

  ngOnInit(): void {
    this.getAlll();
  }

  loadMoreProducts() {
    if (this.hasMoreItems()) {
      this.page += 1;
      this.getAlll();
    } else {
      // When maximum items are reached, show reset button
      this.showResetButton = true;
    }
  }

  getAlll() {
    this.productService.getAllByPage(this.page, this.size).subscribe((data: any) => {
      const newProducts = data.result.content;
      this.totalItems = data.result.totalElements;

      if (newProducts.length > 0) {
        this.products.push(...newProducts);
      }

      // Check if maximum products have been loaded
      this.showResetButton = this.products.length >= this.totalItems;

      this.products.forEach((product) => {
        this.getImageFromService(product.image, product.product_id);
      });
    });
  }

// Method to check if more items are available
  hasMoreItems(): boolean {
    return (this.page + 1) * this.size < this.totalItems;
  }

// Reset pagination to initial state
  resetPagination() {
    this.page = 0; // Reset to page 0
    this.size = 5; // Reset to initial size
    this.products = []; // Clear current products
    this.showResetButton = false; // Hide reset button
    this.getAlll(); // Fetch products again
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

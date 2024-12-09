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
  showResetButton: boolean = false;
  imageUrl!:string;

  constructor(private productService: ProductService, private imgService: ImageService, private router: Router) { }

  ngOnInit(): void {
    this.getAlll();
  }

  loadMoreProducts() {
    if (this.hasMoreItems()) {
      this.page += 1;
      this.getAlll();
    } else {
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
    });
  }

  hasMoreItems(): boolean {
    return (this.page + 1) * this.size < this.totalItems;
  }

  resetPagination() {
    this.page = 0;
    this.size = 5;
    this.products = [];
    this.showResetButton = false;
    this.getAlll();
  }
}

import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {ProductService} from '../../../service/product-service.service';
import {Product} from '../../../model/product.model';
import {ImageService} from '../../../service/img-service.service';
import {FormsModule} from '@angular/forms';
import {PromotionService} from '../../../service/promotion-service.service';
import {Promotion} from '../../../model/promotion.model';
import {CommonModule} from '@angular/common';
import {CategoryService} from "../../../service/categoy-service.service";
import {Category} from "../../../model/category.model";

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {

  searchTerm: string = '';
  products: Product[] = [];
  imgAvatars: { [key: string]: string } = {};
  clicksale: boolean = false;
  product: any;
  promotion: Promotion = new Promotion();
  category: Category[] = []
  selectedCategoryId: string = '';

  constructor(private productService: ProductService,
              private imgService: ImageService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategory()
    this.filterProducts()
  }

  filterProducts() {
    this.productService.findAllProductsWithoutPromotion().subscribe((data: any) => {
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      this.products = data.result.filter((product: Product) => {
        const matchesCategory = !this.selectedCategoryId || product.category?.category_id === this.selectedCategoryId;
        const matchesSearchTerm = !this.searchTerm || product.name.toLowerCase().includes(lowerSearchTerm);
        return matchesCategory && matchesSearchTerm;
      });
      this.products.forEach((product) => {
        this.getImageFromService(product.image, product.product_id);
      })
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

  deletePr(product_id: string) {
    if (window.confirm("Are you sure want to delete this product ?")) {
      this.productService.deleteProduct(product_id).subscribe(
        (data: any) => {
          this.filterProducts();
        });
    }
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.category = data.result
    })
  }
}

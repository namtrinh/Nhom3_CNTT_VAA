import {Component, HostListener, OnInit} from '@angular/core';
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
  product: any;
  page: number = 0;
  size: number = 20;
  promotion: Promotion = new Promotion();
  category: Category[] = []
  isLoading: boolean = false;
  imageUrl: any;
  private categories: any;
  categoryId:string = '';
  message:string = '';
  showMessage: boolean = false;


  constructor(private productService: ProductService,
              private imgService: ImageService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategory()
    this.filterProducts();
  }

  loadProducts(): void {

    if (!this.searchTerm && !this.categoryId) {
      this.products = [];
      this.page = 0;
      this.filterProducts();
    } else {
      this.products = [];
      this.searchProduct(this.searchTerm, this.categoryId);
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      this.page += 1;
      this.filterProducts();
    }
  }

  filterProducts() {
    this.isLoading = true;
    this.productService.getAllByPage(this.page, this.size).subscribe((data: any) => {
      const newProducts = data.result.content;
      // Thêm các sản phẩm vào danh sách
      this.products.push(...newProducts);
      this.isLoading = false;
    });
  }

  deletePr(product_id: string) {
    if (window.confirm("Are you sure you want to delete this product")) {
      this.productService.deleteProduct(product_id).subscribe(() => (
        window.location.reload()
      ));
    }
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.category = data.result
    })
  }

  searchProduct(searchTerm: string, categoryId: string): void {
    this.isLoading = true;
    this.productService.searchProduct(searchTerm, categoryId).subscribe((data: any) => {
      this.products = data.result;
      if (this.products == null || this.products.length == 0) {
        this.showMessage = true;
        this.message = 'Cannot find any products!'
      }else{
        this.showMessage = false;
      }
      console.log(this.products);
      this.isLoading = false;
    });
  }

}

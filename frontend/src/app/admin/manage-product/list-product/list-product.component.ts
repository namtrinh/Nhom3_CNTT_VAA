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
  size: number = 10;
  promotion: Promotion = new Promotion();
  category: Category[] = []
  isLoading: boolean = false;
  imageUrl: any;
  categoryId:string = '';
  message:string = '';
  showMessage: boolean = false;

  constructor(private productService: ProductService,
              private imgService: ImageService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategory()
    this.getAllProduct();
  }

  loadProducts(): void {
    if (!this.searchTerm && !this.categoryId) {
      this.products = [];
      this.page = 0;
      this.getAllProduct();
    } else {
      this.products = [];
      this.searchProduct(this.searchTerm, this.categoryId);
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.searchTerm && !this.categoryId) {
      const {scrollTop, scrollHeight} = document.documentElement;
      const windowHeight = window.innerHeight;
      if (scrollTop + windowHeight >= scrollHeight - 100 && !this.isLoading) {
        this.isLoading = true;
        this.page++;
        this.getAllProduct();
      }
    }
  }

  getAllProduct() {
    this.isLoading = true;
    this.productService.getAllByPage(this.page, this.size).subscribe((data: any) => {
      const newProducts = data.result.content;
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.productService.uploadFile(file).subscribe({
        next: (response) => {
          alert("Import Successfully!");
          console.log('File uploaded successfully', response);
        }
      });
    }
  }

}

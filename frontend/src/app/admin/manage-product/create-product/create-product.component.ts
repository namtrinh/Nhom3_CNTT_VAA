import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/product-service.service';
import { Product } from '../../../model/product.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { format } from 'date-fns';
import { CategoryService } from '../../../service/categoy-service.service';
import { Category } from '../../../model/category.model';
import { Promotion } from '../../../model/promotion.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  checkproduct: any;
  product: Product = new Product();
  categorys: Category[] = [];
  categoryId!:number;

  constructor(
    public productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    // Gọi phương thức để lấy danh sách danh mục
    this.getCategory();
  }

  create() {
    this.product.category = {
      category_id: this.categoryId
    }
    this.product.time_created = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.productService.createProduct(this.product).subscribe((data: any) => {
      this.router.navigate(['/admin/product']);
    }, (error: HttpErrorResponse) => {
      this.checkproduct = `${error.error.message}`;
    });
  }

  getCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categorys = data.result;
    })
  }

  OnSubmit() {
    this.create();
  }
}

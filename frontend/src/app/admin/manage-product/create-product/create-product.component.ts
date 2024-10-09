import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/product-service.service';
import { Product } from '../../../model/product.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { format } from 'date-fns';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  checkproduct: any;
  product: Product = new Product();
  constructor(public productService: ProductService, private router: Router) { }

  create() {
    this.product.time_created = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.productService.createProduct(this.product).subscribe((data: any) => {
      this.router.navigate(['/admin/product']);
    }, (error: HttpErrorResponse) => {
      this.checkproduct = `${error.error.message}`;

    })
  }

  OnSubmit() {
    this.create();
  }

}

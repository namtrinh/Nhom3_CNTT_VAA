import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../service/product-service.service';
import { Product } from '../../model/product.model';
import { ImageService } from '../../service/img-service.service';
import { Category } from '../../model/category.model';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProductExtendComponent } from "../product-extend/product-extend.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductExtendComponent],
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.scss'
})
export class ProductSaleComponent implements OnInit {
  sale!:number;
  products: any;
  product!: Product[];
  category:Category[] = [];

  imgAvatars: { [key: string]: string } = {};
  constructor(private router: Router, private productService: ProductService,
    private imgService: ImageService) { }

  ngOnInit(): void {
    this.getAllPoduct();
   
  }

  getAllPoduct() {
    this.productService.getAllSale().subscribe((data: any) => {
      this.product = data.result;
      this.product.forEach((product) => {
        this.getImageFromService(product.image, product.product_id)
      }, (error: any) => {
        console.log(error);
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

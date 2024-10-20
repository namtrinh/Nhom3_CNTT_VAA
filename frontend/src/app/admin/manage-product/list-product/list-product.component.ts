import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../service/product-service.service';
import { Product } from '../../../model/product.model';
import { ImageService } from '../../../service/img-service.service';
import { FormsModule } from '@angular/forms';
import { PromotionService } from '../../../service/promotion-service.service';
import { Promotion } from '../../../model/promotion.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {

  searchTerm: string = ''; // Từ khóa tìm kiếm
  products: Product[] = [];
  imgAvatars: { [key: string]: string } = {};
  clicksale: boolean = false;
  product: Product = new Product();
  promotion: Promotion = new Promotion();
  selectedProductId!: string;
  isVisible: boolean = false;
  constructor(private productService: ProductService,
    private router: Router,
    private imgService: ImageService,
    private promotionService: PromotionService) { }

  ngOnInit(): void {

    this.getAllPR();
  }

  getAllPR() {
    this.productService.findAllProductsWithoutPromotion().subscribe((data: any) => {
      if (!this.searchTerm) {
        this.products = data.result;
      } else {
        const lowerSearchTerm = this.searchTerm.toLowerCase();
        this.products = data.result.filter((product: { name: string; }) =>
          product.name.toLowerCase().includes(lowerSearchTerm)
        );
      }
      this.products.forEach((products) => {
        this.getImageFromService(products.image, products.product_id);
      })
    })
  }

  private getImageFromService(imageName: string, product_id: string): void {
    if (imageName) {
      this.imgService.getImage(imageName).subscribe(
        (data: any) => {
          const blob = new Blob([data], { type: 'image/*' });
          this.imgAvatars[product_id] = URL.createObjectURL(blob);
        },
        error => {
          console.log(error);
        });
    } else { }
  }


  // Component.ts
  deletePr(product_id: string) {
    if (window.confirm("Are you sure want to delete this product ?")) {
      this.productService.deleteProduct(product_id).subscribe(
        (data: any) => {
          this.getAllPR();
        });
    }
  }

  clicksales() {
    this.clicksale = true;
  }

  h(evt: any, productId: string) {
    const isChecked = evt.target.checked;
    const product = this.products.find(products => products.product_id === productId);
    if (isChecked && product) {
      product.selected = isChecked;
      this.selectedProductId = productId;
    }
  }

  createPromotion() {
    this.promotion.product = {
      product_id: this.selectedProductId
    }
    this.promotionService.create(this.promotion).subscribe((data => {
      this.showToast()
    //  setTimeout(() => {
    //    window.location.reload();
   //   },0)
    }))
  }

  resetCheckbox() {
    if (this.selectedProductId) {
      const product = this.products.find(p => p.product_id === this.selectedProductId);
      if (product) {
        product.selected = false;
      }
    }
  }

  showToast() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  getprWithpromotion(){
    this.productService.findAllProductsWithPromotion().subscribe((data:any) =>{
      this.products =data.result;
    })
  }
}

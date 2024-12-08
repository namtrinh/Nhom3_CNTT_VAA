import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import {ProductService} from '../../../service/product-service.service';
import {Product} from '../../../model/product.model';
import {ImageService} from '../../../service/img-service.service';
import {FormsModule} from '@angular/forms';
import {CategoryService} from "../../../service/categoy-service.service";
import {Category} from "../../../model/category.model";
import {PromotionService} from "../../../service/promotion-service.service";
import {Promotion} from "../../../model/promotion.model";
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  ngOnInit(): void {
    this.getById();
    this.getCategory();
    this.getPromotion();
  }

  id: any;
  product: Product = new Product();
  selectedFile: File | null = null;
  category: Category[] = [];
  time!: string;
  promotion: Promotion[] = [];
  imageUrl!:string;
  stockStatus:string ='';

  constructor(private active: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private imgService: ImageService,
              private categoryService: CategoryService,
              private promotionService: PromotionService,
              private location: Location) {}

  private getById() {
    this.id = this.active.snapshot.params['product_id'];
    this.productService.getById(this.id).subscribe((data: any) => {
      this.product = data.result;
      if (!this.product.category) {
        this.product.category = {category_id: null};
      }
      if (!this.product.promotion) {
        this.product.promotion = {promotion_id: null};
      }
     this.imageUrl = this.product.image;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  private updateProduct() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('seotitle', this.product.seotitle)
    formData.append('quantity', this.product.quantity.toString());
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    formData.append('stock_stastus', this.product.stockStatus);
    if (this.product.category?.category_id) {
      formData.append('category', this.product.category.category_id);
    }
    if (this.product.promotion?.promotion_id) {
      formData.append('promotion', this.product.promotion.promotion_id)
    }
    console.log(this.product.promotion.promotion_id)
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }else {
      formData.append('image',this.product.image)
    }

    this.productService.editById(this.id, formData).subscribe(
      (data: any) => {
        this.location.back();
      })
  }

  getCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.category = data.result;
    })
  }

  getPromotion() {
    this.promotionService.getAll().subscribe((data: any) => {
      this.promotion = data.result;
    })
  }

  OnSubmit() {
    this.updateProduct();
  }
}

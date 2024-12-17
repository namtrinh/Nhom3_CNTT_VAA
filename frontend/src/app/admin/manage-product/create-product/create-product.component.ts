import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../../service/product-service.service';
import {Product} from '../../../model/product.model';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {format} from 'date-fns';
import {CategoryService} from '../../../service/categoy-service.service';
import {Category} from '../../../model/category.model';
import {Promotion} from '../../../model/promotion.model';
import {Location} from "@angular/common";
import {SmartPhone} from "../../../model/product/smartphone.model";
import {LapTop} from "../../../model/product/laptop.model";
import {HeadPhone} from "../../../model/product/headphone.model";
import {ChargingCable} from "../../../model/product/chargingcable.model";
import {Mouse} from "../../../model/product/mouse.model";
import {KeyBoard} from "../../../model/product/keyboard.model";
import {Tablet} from "../../../model/product/tablet.model";
import {Powerbank} from "../../../model/product/powerbank.model";

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
  categoryId: string = '';
  selectedFile: File | null = null;
  default: string = '';
  stockStatus: string = '';
  products: Product[] = [];
  imageUrl!:string;

  constructor(
    public productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.getCategory();
  }


  getCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categorys = data.result;
    })
  }

  OnSubmit() {
    this.createProduct();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  private createProduct() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('seotitle', this.product.seotitle)
    formData.append('quantity', this.product.quantity.toString());
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    const formattedTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    formData.append('time_created', formattedTime);
    formData.append('stockStatus', this.stockStatus);
    console.log(this.categoryId)
    formData.append('category', this.categoryId.toString());
    if (!this.categoryId) {
      alert("Category is not null!");
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    console.log(formData)
    this.productService.createProduct(formData).subscribe(
      (data: any) => {
        this.router.navigate(['/admin/product']);
        //  this.location.back();
      })
  }
}

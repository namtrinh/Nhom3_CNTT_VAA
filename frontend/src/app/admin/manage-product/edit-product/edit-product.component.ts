import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ProductService } from '../../../service/product-service.service';
import { Product } from '../../../model/product.model';
import { ImageService } from '../../../service/img-service.service';
import { FormsModule } from '@angular/forms';
import {CategoryService} from "../../../service/categoy-service.service";
import {Category} from "../../../model/category.model";

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
  }
  id: any;
  product: Product = new Product();
  selectedFile: File | null = null;
  imgAvatar!: string;
  category:Category[] = [];
  cate!: string;
  time!:string;
  constructor(private active: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private imgService: ImageService,
  private categoryService:CategoryService) { }

  private getById() {
    this.id = this.active.snapshot.params['product_id'];
    this.productService.getById(this.id).subscribe((data: any) => {
      this.product = data.result;
      if (!this.product.category) {
        this.product.category = { category_id: 1 }; // hoặc gán category mặc định
      }
      this.getImageFromService(this.product.image);
    });
  }

  getImageFromService(imageName: string): void {
    if (imageName !== null && imageName !== undefined) {
      this.imgService.getImage(imageName).subscribe(data => {
        const blob = new Blob([data], { type: 'image/*' });
        this.imgAvatar = URL.createObjectURL(blob);
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    // đọc file và hiện
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgAvatar = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }


  private updateProduct() {
    this.productService.editById(this.id, this.product).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/admin/product']);
      },
      error => {
        console.log(error);
      }
    )
  }

  getCategory(){
    this.categoryService.getAll().subscribe((data:any) =>{
      this.category = data.result;
    })
  }

  OnSubmit() {
    this.updateProduct();
  }
}

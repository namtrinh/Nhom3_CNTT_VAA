import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ProductService } from '../../../service/product-service.service';
import { Product } from '../../../model/product.model';
import { ImageService } from '../../../service/img-service.service';
import { FormsModule } from '@angular/forms';

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
  }
  id: any;
  product: Product = new Product();
  selectedFile: File | null = null;
  imgAvatar!: string;
  cate!: string;
  time!:string;
  constructor(private active: ActivatedRoute, private router: Router, private productService: ProductService, private imgService: ImageService) { }

  private getById() {
    this.id = this.active.snapshot.params['product_id'];
    this.productService.getById(this.id).subscribe((data: any) => {
      this.product = data.result;
      this.time = this.product.time_created;
      console.log(this.time);
      this.cate = data.result.category;
      this.getImageFromService(this.product.image);
    },
      error => {
        console.log(error);
      });
  }

  getImageFromService(imageName: string): void {
    if (imageName !== null && imageName !== undefined) {
      this.imgService.getImage(imageName).subscribe(data => {
        const blob = new Blob([data], { type: 'image/*' });
        this.imgAvatar = URL.createObjectURL(blob);
      });
      (error: any) => {
        console.error(error);
      }
    } else { }
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
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('quantity', this.product.quantity.toString());
    formData.append('price', this.product.price.toString());
    if(this.product.discount == undefined){
      this.product.discount = 0;
    }
    formData.append('discount', this.product.discount.toString());
    formData.append('description', this.product.description);
    formData.append('time_created',this.time)
    //   formData.append('category', this.product.category.category_id.toString());
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    } else {
      formData.append('image', this.product.image);
    }

    this.productService.editById(this.id, formData).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/admin/product']);

      },
      error => {
        console.log(error);
      }
    )
  }

  OnSubmit() {
    this.updateProduct();
  }

}

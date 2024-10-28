import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../service/categoy-service.service";
import {Category} from "../../model/category.model";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ImageService} from "../../service/img-service.service";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent implements OnInit{

  categorys: Category[] = [];
  category:Category = new Category();
  products: Product[] = []
  imgAvatars: { [key: string]: string } = {};
    constructor(private categoryService: CategoryService,
                private imgService: ImageService) {
    }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
      this.categoryService.getAll().subscribe((data:any) =>{
        this.categorys = data.result;
        this.categorys.forEach(data =>{
          this.products = data.products;
          this.products.forEach(data =>{
            this.getImageFromService(data.image, data.product_id);
          })
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

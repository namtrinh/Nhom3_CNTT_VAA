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
  imageUrl!:string;
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
        })
      })
  }


}

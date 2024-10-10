import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product.model';
import {Category} from '../../model/category.model';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../service/product-service.service';
import {ImageService} from '../../service/img-service.service';
import {CategoryService} from "../../service/categoy-service.service";

@Component({
  selector: 'app-product-by-category',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.scss']
})
export class ProductByCategoryComponent implements OnInit {
  products: any;
  product!: Product[];
  imgAvatars: { [key: string]: string } = {};
  category_id!: number;
  category:Category = new Category()
  category_name !: string

  constructor(private router: Router,
              private productService: ProductService,
              private imgService: ImageService,
              private active: ActivatedRoute,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {

    this.active.paramMap.subscribe((params) => {
      const categoryId = Number(params.get('category_id'));
      this.category_id = categoryId;
      this.getNameCategory(categoryId)
      this.getAllProduct(this.category_id);
    });
  }

  getNameCategory(category_id:number) {
    this.categoryService.getById(category_id).subscribe((data:any) => {
      this.category = data.result;
      this.category_name = this.category.name
      console.log(this.category_name)
    })
  }

  a!: string[]

  getAllProduct(category_id: number) {
    // Check category_id
    if (category_id === 0) {
      this.productService.getAll().subscribe((data: any) => {
        this.product = data.result;
        this.product.forEach((product) => {
          this.getImageFromService(product.image, product.product_id);
        });
      });
    } else {
      this.productService.getProductByCategory(category_id).subscribe((data: any) => {
        this.product = data.result;
        this.product.forEach((product) => {
          this.getImageFromService(product.image, product.product_id);
        });
      });
    }
  }

  private getImageFromService(imageName: string, product_id: string): void {
    if (imageName) {
      this.imgService.getImage(imageName).subscribe(
        (data: any) => {
          const blob = new Blob([data], {type: 'image/*'});
          this.imgAvatars[product_id] = URL.createObjectURL(blob);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}

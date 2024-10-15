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
  category: Category = new Category()
  category_name !: string
  seotitle!: string | null;
  categoryId!: any;

  constructor(private productService: ProductService,
              private imgService: ImageService,
              private active: ActivatedRoute,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getAll();
    this.active.paramMap.subscribe((params) => {
      const seoTitle = String(params.get('seotitle'));
      this.seotitle = seoTitle;
      this.getNameCategory(this.seotitle);
    });
  }

  getNameCategory(seotitle: string) {
    this.categoryService.getBySeoTitle(seotitle).subscribe(
      (data: any) => {
        this.category = data.result;
        this.categoryId = this.category.category_id;
        this.category_name = this.category.name;
        if (this.categoryId) {
          this.getAllProduct(this.categoryId);
        }
      })
  }

  getAll() {
    const id = this.active.snapshot.params['seotitle'];
    if (id === 'all') {
      this.productService.getAll().subscribe((data: any) => {
        this.product = data.result;
        this.product.forEach((product) => {
          this.getImageFromService(product.image, product.product_id);
        })
      })
    }
  }

  getAllProduct(categoryId: number) {
    this.productService.getProductByCategory(categoryId).subscribe((data: any) => {
      this.product = data.result;
      this.product.forEach((product) => {
        this.getImageFromService(product.image, product.product_id);
      });
    });
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

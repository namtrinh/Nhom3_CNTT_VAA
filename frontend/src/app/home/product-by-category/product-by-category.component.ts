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
  products: Product[] = []
  imgAvatars: { [key: string]: string } = {};
  category_id!: number;
  category: Category = new Category()
  category_name !: string
  seotitle!: string | null;
  imageUrl!:string;

  constructor(private active: ActivatedRoute,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.active.paramMap.subscribe((params) => {
      const seoTitle = String(params.get('seotitle'));
      this.seotitle = seoTitle;
      this.getProductFromCategory(this.seotitle);
    });
  }

  getProductFromCategory(seotitle: string) {
      this.categoryService.getBySeoTitle(seotitle).subscribe((data: any) => {
        this.category = data.result;
        this.category_name = this.category.ct_name;
        this.products = this.category.products
      });
  }

    protected readonly Product = Product;
}

import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {ProductService} from '../../../service/product-service.service';
import {Product} from '../../../model/product.model';
import {ImageService} from '../../../service/img-service.service';
import {FormsModule} from '@angular/forms';
import {PromotionService} from '../../../service/promotion-service.service';
import {Promotion} from '../../../model/promotion.model';
import {CommonModule} from '@angular/common';
import {CategoryService} from "../../../service/categoy-service.service";
import {Category} from "../../../model/category.model";

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {

  searchTerm: string = '';
  products: Product[] = [];
  imgAvatars: { [key: string]: string } = {};
  clicksale: boolean = false;
  product: any;
  page: number = 0;
  size: number = 20;
  promotion: Promotion = new Promotion();
  category: Category[] = []
  selectedCategoryId: string = '';
  isLoading: boolean = false;
  imageUrl:any;

  constructor(private productService: ProductService,
              private imgService: ImageService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategory()
    this.filterProducts()
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      this.page += 1;
      this.filterProducts();
    }
  }

  filterProducts() {
    this.isLoading = true;
    this.productService.getAllByPage(this.page, this.size).subscribe((data: any) => {
      const newProducts = data.result.content;
      console.log(newProducts);
      // Thêm các sản phẩm vào danh sách
      this.products.push(...newProducts);
      this.isLoading = false;
    });
  }

 /* private getImageFromService(imageName: string, product_id: string): void {
    if (imageName) {
      this.imgService.getImage(imageName).subscribe(
        (data: any) => {
          const blob = new Blob([data], {type: 'image/*'});
          this.imgAvatars[product_id] = URL.createObjectURL(blob);
        })
    }
  }

  */

  deletePr(product_id: string) {
    if (window.confirm("Are you sure you want to delete this product")) {
      this.productService.deleteProduct(product_id).subscribe(() => (
        window.location.reload()
      ));
    }
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.category = data.result
    })
  }
}

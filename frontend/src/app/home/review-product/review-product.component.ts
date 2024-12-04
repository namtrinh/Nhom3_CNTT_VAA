import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReviewService} from "../../service/review-service.service";
import {Review} from "../../model/review.model";
import {ProductService} from "../../service/product-service.service";
import {Product} from "../../model/product.model";
import {DecimalPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule
  ],
  styleUrls: ['./review-product.component.css']
})
export class ReviewProductComponent implements OnChanges {
  @Input() productId!: string;
  reviews: Review[] = [];
  review: Review = new Review();
  product: Product = new Product();
  page: number = 0;
  size: number = 3;
  pageCurrent: number = 0;
  pageMax!: number;
  averageRating:number = 0;

  constructor(private reviewService: ReviewService,
              private productService: ProductService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && !changes['productId'].firstChange) {
      console.log(this.productId)
      this.getProductById()
      this.getAllByProduct();
    }
  }

  getAllByProduct(): void {
    console.log("ID:" + this.productId);
    this.reviewService.getAllProduct(this.productId, this.page, this.size).subscribe(
      (data: any) => {
        // Lưu reviews và các thông tin phân trang
        this.reviews = data.result.content;
        this.pageCurrent = data.result.pageable.pageNumber;
        this.pageMax = data.result.totalPages;

        // Tính trung bình số sao
        this.calculateAverageRating();

        console.log('Page Max:', this.pageMax);
      }
    );
  }

  save(){
    this.review.product = {
      product_id: this.productId
    }
    this.reviewService.save(this.review).subscribe((data:any) =>{
      alert("Send review successfully !")
    })
  }

  calculateAverageRating(): void {
    if (this.reviews && this.reviews.length > 0) {
      const totalStars = this.reviews.reduce((sum, review) => sum + review.rating, 0);

      this.averageRating = totalStars / this.reviews.length;
    } else {
      this.averageRating = 0;
    }
  }


  getProductById() {
    this.productService.getById(this.productId).subscribe((data: any) => {
      this.product = data.result;
    })
  }

  decrease() {
    if (this.page >= 0) {
      this.page--;
      console.log(this.page)
      this.size = 3;
      this.getAllByProduct()
    }
  }

  increase() {
    if (this.page < this.pageMax - 1) {
      this.page++;
      console.log(this.page);
      this.size = 3;
      this.getAllByProduct()
    }
  }

  nochange(page: number) {
    this.page = page;
    this.size = 3;
    this.getAllByProduct()
  }

}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReviewService} from "../../service/review-service.service";
import {Review} from "../../model/review.model";
import {ProductService} from "../../service/product-service.service";
import {Product} from "../../model/product.model";
import {DecimalPipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {formatDistanceToNow} from "date-fns";
import {enUS, vi} from "date-fns/locale";
import {Router} from "@angular/router";

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    NgIf
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
  averageRating: number = 0;
  isVisible: boolean = false;
  userId:any;

  constructor(private reviewService: ReviewService,
              private productService: ProductService,
              private router:Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && !changes['productId'].firstChange) {
      this.getProductById()
      this.getAllByProduct();
    }
  }

  getAllByProduct(): void {
    console.log("ID:" + this.productId);
    this.reviewService.getAllProduct(this.productId, this.page, this.size).subscribe((data: any) => {
        this.reviews = data.result.content;
        this.reviews = data.result.content.map((reviews: Review) => {
          const formattedDate = formatDistanceToNow(new Date(reviews.reviewDate), {
            addSuffix: true,
            locale: enUS,
          });
          return {
            ...reviews,
            reviewDate: formattedDate,
          };
        });
        this.pageCurrent = data.result.pageable.pageNumber;
        this.pageMax = data.result.totalPages;
      }
    );
  }


  save() {
    this.userId = localStorage.getItem("userId")
    if(this.userId) {
      this.review.product = {
        product_id: this.productId
      }
      this.reviewService.save(this.review).subscribe((data: any) => {
        this.showToast();
        this.getAllByProduct();
      })
    }else{
      this.router.navigate(['/login'])
    }
  }

  showToast() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 5000);
  }

  getProductById() {
    this.productService.getById(this.productId).subscribe((data: any) => {
      this.product = data.result;
      this.averageRating = this.product.totalRating;
    })
  }

  decrease() {
    if (this.page >= 0) {
      this.page--;
      this.size = 3;
      this.getAllByProduct()
    }
  }

  increase() {
    if (this.page < this.pageMax - 1) {
      this.page++;
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

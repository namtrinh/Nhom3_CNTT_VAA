import {Component, HostListener, OnInit} from '@angular/core';
import {ReviewService} from "../../../service/review-service.service";
import {Review} from "../../../model/review.model";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-list-review',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './list-review.component.html',
  styleUrl: './list-review.component.css'
})
export class ListReviewComponent implements OnInit {
  constructor(private reviewService: ReviewService) {
  }
  reviews: Review[] = [];
  page: number = 0;
  size: number = 20;
  review: Review = new Review();
  searchTerm:string ='';
  rating:number = 0;
  showMessage:boolean = false;
  message:string = '';
  isLoading: boolean = false;
  currentPage:number = 0;
  currentPage1:number = 0;
  ngOnInit(): void {
    this.getAll();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.searchTerm && !this.rating) {
      const {scrollTop, scrollHeight} = document.documentElement;
      const windowHeight = window.innerHeight;
      if (scrollTop + windowHeight >= scrollHeight - 100 && !this.isLoading) {
        this.page++;
        this.getAll();
      }
    }
  }


  getAll() {
    this.isLoading = true;
    this.reviewService.getAll(this.page, this.size).subscribe((data: any) => {
      this.currentPage = data.result.pageable.pageNumber;
      const reviews = data.result.content;
      this.reviews.push(...reviews);
      this.isLoading = false;
    })
  }

  update(reviewId: string, review: any) {
    this.reviewService.update(reviewId, review).subscribe((data: any) => {
      const index = this.reviews.findIndex(review => review.reviewId === reviewId);
      if (index !== -1) {
        // Cập nhật thông tin đánh giá trong mảng
        this.reviews[index].statusCmt = data.result.statusCmt;
      }
    });
  }

  delete(reviewId: string): void {
    this.reviewService.deleteById(reviewId).subscribe(() => {
      const index = this.reviews.findIndex(review => review.reviewId === reviewId);
      if (index !== -1) {
        this.reviews.splice(index, 1);
      }
    });
  }

  search(searchTerm: string, rating: number): void {
    this.isLoading = true
    this.reviewService.filter(searchTerm, rating).subscribe((data: any) => {
      this.reviews = data.result;
      if (this.reviews == null || this.reviews.length == 0 ) {
        this.showMessage = true;
        this.message = 'Cannot find any review of this product!'
      }else{
        this.showMessage = false;
      }
    this.isLoading = false
    });
  }

  loadReviews(): void {
    if (!this.searchTerm && !this.rating) {
      this.reviews = [];
      this.page = 0;
      this.getAll();
    } else {
      this.reviews = [];
      this.search(this.searchTerm, this.rating);
    }
  }
}

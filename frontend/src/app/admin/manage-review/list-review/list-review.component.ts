import {Component, OnInit} from '@angular/core';
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
  size: number = 10;
  review: Review = new Review();
  searchTerm:string ='';
  rating:number = 0;
  showMessage:boolean = false;
  message:string = '';

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.reviewService.getAll(this.page, this.size).subscribe((data: any) => {
      this.reviews = data.result.content;
      console.log(this.review);
    })
  }

  update(reviewId: string, review: any) {
    this.reviewService.update(reviewId, review).subscribe((data: any) => {
      console.log(review)
      this.getAll();
    })
  }

  delete(reviewId: string) {
    if (window.confirm("Are you sure you want to delete")) {
      this.reviewService.deleteById(reviewId).subscribe((data: any) => {
        this.getAll();
      })
    }
  }

  search(searchTerm: string, rating: number): void {
    this.reviewService.filter(searchTerm, rating).subscribe((data: any) => {
      this.reviews = data.result;
      if (this.reviews == null || this.reviews.length == 0 ) {
        this.showMessage = true;
        this.message = 'Cannot find any review of this product!'
      }else{
        this.showMessage = false;
      }
      console.log(this.reviews);

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

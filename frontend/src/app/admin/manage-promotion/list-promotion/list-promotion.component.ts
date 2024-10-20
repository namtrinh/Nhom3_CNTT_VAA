import {Component, OnInit} from '@angular/core';
import {PromotionService} from "../../../service/promotion-service.service";
import {Promotion} from "../../../model/promotion.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-promotion',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './list-promotion.component.html',
  styleUrl: './list-promotion.component.css'
})
export class ListPromotionComponent implements OnInit {

  constructor(private promotionService: PromotionService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  promotions: Promotion[] = [];

  getAll() {
    this.promotionService.getAll().subscribe((data: any) => {
      this.promotions = data.result;
      console.log(this.promotions)
      this.promotions.forEach(promotion => {
        promotion.time_started = new Date(promotion.time_started).toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
        promotion.time_end = new Date(promotion.time_end).toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
      })
    })
  }

  deleteById(promotionId: string) {
    if (window.confirm("Are you sure want to delete this promotion")) {
      this.promotionService.deleteById(promotionId).subscribe((data: any) => {
        this.getAll();
      })
    }
  }


}

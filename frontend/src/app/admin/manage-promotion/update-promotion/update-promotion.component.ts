import {Component, OnInit} from '@angular/core';
import {PromotionService} from "../../../service/promotion-service.service";
import {Promotion} from "../../../model/promotion.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-update-promotion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-promotion.component.html',
  styleUrl: './update-promotion.component.css'
})
export class UpdatePromotionComponent implements OnInit {

  constructor(private promotionService: PromotionService,
              private router: Router,
              private activerouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getById()
  }

  id!: string
  promotion: Promotion = new Promotion()

  getById() {
    this.id = this.activerouter.snapshot.params['promotion_id'];
    this.promotionService.getById(this.id).subscribe(
      (response: any) => {
        this.promotion = response.result;
        this.promotion.time_started = new Date(this.promotion.time_started).toISOString().slice(0, 16); // ISO format
        this.promotion.time_end = new Date(this.promotion.time_end).toISOString().slice(0, 16); // ISO format
      }
    );
  }


  updatePromotion() {
    const {product, ...promotionWithoutProduct} = this.promotion;
    this.promotionService.updateById(this.id, promotionWithoutProduct).subscribe(
      (data: any) => {
        this.router.navigate(['/admin/promotion']);
      },
    );
  }


  onSubmit() {
    this.updatePromotion()
  }
}

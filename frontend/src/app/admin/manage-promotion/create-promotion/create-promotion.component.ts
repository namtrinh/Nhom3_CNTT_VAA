import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {PromotionService} from "../../../service/promotion-service.service";
import {Promotion} from "../../../model/promotion.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-promotion',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './create-promotion.component.html',
  styleUrl: './create-promotion.component.css'
})
export class CreatePromotionComponent {

  constructor(private promotionService: PromotionService,
              private router:Router) {
  }

  promotion:Promotion = new Promotion();

  createPromotion(){
    this.promotionService.create(this.promotion).subscribe(data =>{
      this.router.navigate(['/admin/promotion']);
    })
  }

  onSubmit(){
    this.createPromotion();
  }
}

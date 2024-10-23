import {Component, OnInit} from '@angular/core';
import {OrderDetail} from "../../../model/order_detail.model";
import {OrderDetailService} from "../../../service/orderDetail-service.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Product} from "../../../model/product.model";
import {SharedDataService} from "../../../service/shared-data.service";
import {Order} from "../../../model/order.model";

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    FormsModule, CommonModule, RouterLink
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit{

  ngOnInit(): void {
    const id = this.router.snapshot.params['order_detail_id'];
    this.getById(id);
    this.order = this.sharedDataService.getData()
    this.order.time_created = new Date(this.order.time_created).toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
    }

  orderDetail:OrderDetail = new OrderDetail();
  order:Order = new Order();

  constructor(private orderDetailService: OrderDetailService,
              private router:ActivatedRoute,
              private sharedDataService: SharedDataService) {
  }

  getById(orderDetailId:string){
    this.orderDetailService.getById(orderDetailId).subscribe((data:any) =>{
      this.orderDetail = data.result;
    })
  }

}

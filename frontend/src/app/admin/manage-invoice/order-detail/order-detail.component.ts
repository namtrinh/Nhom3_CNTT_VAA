import {Component, OnInit} from '@angular/core';
import {OrderDetail} from "../../../model/order_detail.model";
import {OrderDetailService} from "../../../service/orderDetail-service.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Product} from "../../../model/product.model";
import {SharedDataService} from "../../../service/shared-data.service";
import {Order} from "../../../model/order.model";
import {NgxPrintService, PrintOptions} from "ngx-print";
import {OrderDetailProductService} from "../../../service/orderDetailProduct-service.service";
import {OrderDetailProduct} from "../../../model/order_detail_product.model";

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
    this.getOrderDetails(id);
    this.order = this.sharedDataService.getData()
    this.order.time_created = new Date(this.order.time_created).toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
    }

  orderDetail:OrderDetail = new OrderDetail();
  order:Order = new Order();
  orderDetailProduct:OrderDetailProduct[] = [];
  totalPrice:number = 0;
  totalPriceSale:number = 0;

  constructor(private orderDetailService: OrderDetailService,
              private router:ActivatedRoute,
              private sharedDataService: SharedDataService,
              private printService: NgxPrintService,
              private orderDetailProductService:OrderDetailProductService) {
  }

  getOrderDetails(orderDetailId: string): void {
    this.orderDetailService.getById(orderDetailId).subscribe((response: any) => {
       this.orderDetail = response.result;
      this.orderDetailProductService.findByOrderDetailId(orderDetailId).subscribe((response: any) => {
         this.orderDetailProduct = response.result;
         console.log(this.orderDetailProduct)
        this.orderDetailProduct.forEach(data => {
        if (data.products_product_id.price !== undefined) {
          this.totalPrice += data.products_product_id.price * data.quantity;
          this.totalPriceSale += data.products_product_id.price * (data.discount / 100);
          console.log(this.totalPrice)
        }
        });

      });
    });
  }


  printMe() {
    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'invoice',  // Corrected to an actual ID
      // Add any other print options as needed
    });
    this.printService.print(customPrintOptions);
  }

}

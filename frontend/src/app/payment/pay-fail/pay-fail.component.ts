import { Component, OnInit } from '@angular/core';
import { VNPayService } from '../../service/payment-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pay-fail',
  standalone: true,
  imports: [],
  templateUrl: './pay-fail.component.html',
  styleUrl: './pay-fail.component.scss'
})
export class PayFailComponent implements OnInit {
  orderId!: string;
  totalPrice!: string;
  paymentTime!: string;
  transactionId!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || null;
      this.totalPrice = params['totalPrice'] || null;
      this.paymentTime = params['paymentTime'] || null;
      this.transactionId = params['transactionId'] || null;
    });
  }
}
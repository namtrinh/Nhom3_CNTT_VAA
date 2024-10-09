import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../service/invoice-service.service';
import { Invoice } from '../../model/invoice.model';

import { FormsModule, NgForm } from '@angular/forms';
import { DetailInvoiceService } from '../../service/detail_invoice-service.service';
import { DetailInvoice } from '../../model/detail_invoice.model';
import { Product } from '../../model/product.model';
import { Category } from '../../model/category.model';
import { format } from 'date-fns';


@Component({
  selector: 'app-pay-success',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pay-success.component.html',
  styleUrl: './pay-success.component.scss'
})
export class PaySuccessComponent implements OnInit {

  orderId!: string;
  totalPrice!: number;
  paymentTime!: string;
  transactionId!: string;
  productID: any;
  invoice: Invoice = new Invoice();
  detailInvoice: DetailInvoice = new DetailInvoice();
  detail_id!: string;

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private detailInvoiceService: DetailInvoiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || null;
      this.totalPrice = params['totalPrice'] || null;
      this.paymentTime = params['paymentTime'] || null;
      this.transactionId = params['transactionId'] || null;
      this.productID = localStorage.getItem('productId');
      console.log(this.productID);
    });

    this.createDetail_Invoice();
  }

  createInvoice(detail_id: string) {
    this.invoice.payment_id = this.transactionId;
    this.invoice.time_created = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.invoice.detailInvoice.detail_invoice_id = detail_id;
    this.invoiceService.create(this.invoice).subscribe((data: any) => {
      console.log(data);
    })
  }

  createDetail_Invoice() {
    this.detailInvoice.total_price = this.totalPrice;
    const newProduct: Product = {
      product_id: this.productID,
      name: '',
      image: '',
      quantity: 0,
      price: 0,
      discount: 0,
      description: '',
      time_created: '',
      category: new Category,
      selected: false
    };
    this.detailInvoice.products?.push(newProduct);
    this.detailInvoiceService.create(this.detailInvoice).subscribe((data: any) => {
      const detail_id = data.result.detail_invoice_id;
      this.createInvoice(detail_id);
    })
  }
}


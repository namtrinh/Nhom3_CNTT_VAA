import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../service/invoice-service.service';
import { Invoice } from '../../../model/invoice.model';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-invoice',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './list-invoice.component.html',
  styleUrl: './list-invoice.component.scss'
})
export class ListInvoiceComponent implements OnInit {

  invoice:Invoice[] = [];
  totalItems: number = 0;
  page: number = 0;
  size: number = 10;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.loadInvoice();
  }

  loadInvoice(): void {
    this.invoiceService.getAll(this.page, this.size).subscribe(data => {
      this.invoice = data.result.content;
      this.totalItems = data.totalElements;
    });(error: any) =>{
      console.log(error);
    }
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadInvoice();
  }
}

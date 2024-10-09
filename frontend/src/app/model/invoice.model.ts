import { DetailInvoice } from "./detail_invoice.model";

export class Invoice {
    invoice_id!: string;
    description!: string;
    payment_id!: string;
    time_created!: string;
    detailInvoice: DetailInvoice = new DetailInvoice;
}
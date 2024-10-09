import { Product } from "./product.model";


export class DetailInvoice {
    detail_invoice_id!: string;
    total_amount!: number;
    total_price!: number;
    products!:Partial<Product[]>;
}
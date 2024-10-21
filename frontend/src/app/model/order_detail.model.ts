import {Product} from "./product.model";
import {Promotion} from "./promotion.model";


export class OrderDetail {
  order_detail_id!: string;
  total_amount!: number;
  total_price!: number;
  products!: Partial<Product[]>;
  promotion!: Partial<Promotion>;
}


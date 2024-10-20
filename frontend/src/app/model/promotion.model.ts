import { Product } from "./product.model";

export class Promotion {
    promotion_id: any;
    pr_name!: string;
    discount!:number;
    time_started!: string;
    time_end!: string;
    product!: Partial<Product>;
}

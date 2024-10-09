import { Product } from "./product.model";

export class Promotion {
    promotion_id!: string;
    name!: string;
    discountt!:number;
    time_started!: string;
    time_end!: string;
    product!: Partial<Product>;
}
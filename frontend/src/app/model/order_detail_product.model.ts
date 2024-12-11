import {Product} from "./product.model";

export class OrderDetailProduct{
    id!:number;
    discount!:number;
    price!:number;
    quantity!:number;
    order_detail_order_detail_id!:string;
    products_product_id!:Partial<Product>;
}

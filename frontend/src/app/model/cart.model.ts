import { Product } from "./product.model";
import { User } from "./user.model";

export class Cart{

    cart_id!:string;
    product_price!:number;
    product_quantity!:number;
    product:Partial<Product> = new Product();
    user!:Partial<User>;
    time_add!:string;
    selected!:boolean;

}

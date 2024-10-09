import { Category } from "./category.model";

export class Product {
    product_id!: string;
    name!: string;
    image!: string;
    quantity!: number;
    price!: number;
    discount!: number;
    description!: string;
    time_created!: string;
    category!: Category;
  selected: boolean = false;

}


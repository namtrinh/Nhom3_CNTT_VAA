import {Category} from "./category.model";

export class Product {
  product_id!: string;
  name!: string;
  seotitle!: string;
  image!: string;
  quantity!: number;
  price!: number;
  description!: string;
  time_created!: string;
  category!: Partial<Category>;
  selected: boolean = false;

}


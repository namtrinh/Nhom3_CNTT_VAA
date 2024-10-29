import {Product} from "./product.model";

export class Category {
  category_id: any;
  seotitle!: string;
  name!: string;
  icon!: string;
  sort!: number;
  poster!:string;
  products:Product[] = [];
}

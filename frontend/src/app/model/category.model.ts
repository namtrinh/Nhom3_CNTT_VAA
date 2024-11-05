import {Product} from "./product.model";

export class Category {
  category_id: any;
  ct_seotitle!: string;
  ct_name!: string;
  icon!: string;
  sort!: number;
  poster!:string;
  products:Product[] = [];
}

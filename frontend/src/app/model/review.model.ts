import {User} from "./user.model";
import {Product} from "./product.model";

export class Review {
  reviewId!: string;
  rating!: number;
  comment!: string;
  statusCmt!: string;
  product!: Partial<Product>;
  customerName!: string;
  phoneNumber!: number;
  sharedWith!: boolean;
  reviewDate!:string;
}

import {User} from "./user.model";
import {Product} from "./product.model";

export class Review {
  review_id!: string;
  rating!: number;
  comment!: string;
  status_cmt!: string;
  user!: Partial<User>;
  product!: Partial<Product>;
  customerName!: string;
  phoneNumber!: number;
  sharedWith!: boolean;
}

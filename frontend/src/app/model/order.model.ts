import { OrderDetail} from "./order_detail.model";
import {User} from "./user.model";

export class Order {
  order_id!: string;
  payment_id!: string;
  description!: string;
  address!: string;
  time_created!: string;
  order_detail!: Partial<OrderDetail>
  user!: Partial<User>
}

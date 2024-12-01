import { OrderDetail} from "./order_detail.model";
import {User} from "./user.model";

export class Order {
  order_id!: string;
  payment_id!: string;
  description!: string;
  address!: string;
  time_created!: string;
  orderDetail_id!:string;
  user!: Partial<User>;
  username!:string;
  email!:string;
  phoneNumber!:string;
  status!:string;
}

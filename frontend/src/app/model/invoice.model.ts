import {DetailInvoice} from "./detail_invoice.model";
import {User} from "./user.model";

export class Invoice {
  order_id!: string;
  payment_id!: string;
  description!: string;
  address!: string;
  time_created!: string;
  order_detail!: Partial<DetailInvoice>
  user!: Partial<User>
}

import {Order} from "./order.model";

export class Statistic{
  statistic_id!: string;
  month!:number
  year!:number
  sum_totalPrice!:number;
  sum_totalQuantity!:number;
  countOrder!:number;
  date_created!:string;
  order:Partial<Order[]> = []
}

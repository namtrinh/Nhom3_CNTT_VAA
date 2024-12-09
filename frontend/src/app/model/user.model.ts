import { Roles } from "./roles.model";

export class User {
  user_id!: string;
  email!: string;
  username!: string;
  password!: string;
  address!: string;
  avatar!: string;
  roles: Roles[] = [];
  time_created!: string;
  selected: boolean = false;
  activated!:boolean;
  verificationCode!:number;
  verificationCodeExpiry!:string;
  requestCount!:number;
  lastRequestTime!:string;
}

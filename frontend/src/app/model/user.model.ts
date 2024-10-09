import { Roles } from "./roles.model";

export class User {
  user_id!: string;
  email!: string;
  username!: string;
  password!: string;
  address!: string;
  avatar!: string;
  roles!: string[];
  time_created!: string;
  selected: boolean = false;
}
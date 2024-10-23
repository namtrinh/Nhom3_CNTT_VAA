import { Injectable } from "@angular/core";
import { OrderDetail} from "../model/order_detail.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class OrderDetailService{
    private baseUrl = "http://localhost:8888/identity/detail-invoice";

    constructor(private http: HttpClient){}

    create(orderDetail: OrderDetail): Observable<Object>{
        return this.http.post(`${this.baseUrl}`,orderDetail)
    }

    getById(id:string):Observable<OrderDetail>{
      return this.http.get<OrderDetail>(`${this.baseUrl}/${id}`)
    }
}

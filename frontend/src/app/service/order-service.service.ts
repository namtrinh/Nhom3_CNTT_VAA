import { Injectable, InjectionToken } from "@angular/core";
import { User } from "../model/user.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Order} from "../model/order.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private pathUrl = "http://localhost:8888/identity/invoice";

    constructor(private http: HttpClient) { }

    getAll(page: number, size: number): Observable<any> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<any>(`${this.pathUrl}`, { params })
    }

    create(order:Order): Observable<Object> {
        return this.http.post(`${this.pathUrl}`, order)
    }
}

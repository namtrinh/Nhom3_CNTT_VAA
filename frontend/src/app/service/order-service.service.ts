import {Injectable, InjectionToken} from "@angular/core";
import {User} from "../model/user.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "../model/order.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private pathUrl = "http://localhost:8888/identity/order";

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.pathUrl}/all`)
  }

  getAll(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.pathUrl}`, {params})
  }

  getByTime(startDate:string, startEnd:string): Observable<Order[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toString())
      .set('endDate', startEnd.toString());
    return this.http.get<Order[]>(`${this.pathUrl}/date`,{params})
  }

  create(order: Order): Observable<Object> {
    return this.http.post(`${this.pathUrl}`, order)
  }
}

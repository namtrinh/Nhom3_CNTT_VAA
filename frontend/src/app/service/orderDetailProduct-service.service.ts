import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {OrderDetailProduct} from "../model/order_detail_product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})

export class OrderDetailProductService{
  constructor(private http:HttpClient) {
  }

  private baseUrl = "http://localhost:8888/identity/v";

  getById(orderDetailId: string, productId: string, orderDetailProduct: OrderDetailProduct):Observable<OrderDetailProduct> {
    const params = new HttpParams()
      .set('orderDetailId', orderDetailId)
      .set('productId', productId);

    return this.http.post<OrderDetailProduct>(`${this.baseUrl}`, orderDetailProduct, {params});
  }

  findByOrderDetailId(orderDetailId: string):Observable<OrderDetailProduct[]>{
    return this.http.get<OrderDetailProduct[]>(`${this.baseUrl}/${orderDetailId}`)
  }

}

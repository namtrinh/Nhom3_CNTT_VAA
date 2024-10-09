import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "../model/cart.model";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private cartUrl = "http://localhost:8888/identity/cart";

    constructor(private http: HttpClient) { }

    getByUserId(user_id: string): Observable<Cart> {
        const params = new HttpParams()
            .set('user_id', user_id);
        return this.http.get<Cart>(`${this.cartUrl}`, { params })
    }

    addToCart(cart:Cart):Observable<Cart>{
        return this.http.post<Cart>(`${this.cartUrl}`,cart)
    }

    updateCart(cart_id: string, cart:Cart):Observable<Object>{
        return this.http.put(`${this.cartUrl}/${cart_id}`,cart)
    }

    delete(cart_id: string):Observable<Object>{
        return this.http.delete(`${this.cartUrl}/${cart_id}`)
    }

}
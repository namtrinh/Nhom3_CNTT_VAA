import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Promotion } from "../model/promotion.model";

@Injectable({
    providedIn: 'root'
})

export class PromotionService{

    private promotionUrl ="http://localhost:8888/identity/promotions";

    constructor(private http: HttpClient){}

    getAll():Observable<Promotion[]>{
        return this.http.get<Promotion[]>(`${this.promotionUrl}`)
    }

    getById(id:string):Observable<Promotion>{
        return this.http.get<Promotion>(`${this.promotionUrl}/${id}`)
    }

    create(promotion:Promotion):Observable<Object>{
        return this.http.post<Promotion>(`${this.promotionUrl}`,promotion)
    }

    deleteById(promotion_id:string):Observable<Object>{
       return this.http.delete(`${this.promotionUrl}/${promotion_id}`)
    }

  updateById(id: string, promotion: Omit<Promotion, "product">):Observable<Object>{
        return this.http.put(`${this.promotionUrl}/${id}`, promotion)
    }
}

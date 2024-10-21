import { Injectable, InjectionToken } from "@angular/core";
import { User } from "../model/user.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Invoice } from "../model/invoice.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class InvoiceService{
    private pathUrl = "http://localhost:8888/identity/invoice";

    constructor(private http:HttpClient){}

    getAll(page: number, size:number): Observable<any>{
        const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
        return this.http.get<any>(`${this.pathUrl}`,{params})
    }

    create(invoice:Invoice): Observable<Object>{
        return this.http.post(`${this.pathUrl}`,invoice)
    }
}

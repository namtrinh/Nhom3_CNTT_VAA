import { Injectable } from "@angular/core";
import { DetailInvoice } from "../model/detail_invoice.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class DetailInvoiceService{
    private baseUrl = "http://localhost:8888/identity/detail-invoice";

    constructor(private http: HttpClient){}

    create(detailInvoice: DetailInvoice): Observable<Object>{
        return this.http.post(`${this.baseUrl}`,detailInvoice)
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VNPayService {
    private apiUrl = 'http://localhost:8888/identity';

    constructor(private http: HttpClient) { }

    submitOrder(amount: number, orderInfo: string): Observable<any> {
        const params = new HttpParams()
            .set('amount', amount)
            .set('orderInfo', orderInfo);

        return this.http.post(`${this.apiUrl}/submitOrder`, null, { params });
    }
}

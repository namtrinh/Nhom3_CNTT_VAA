import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../model/review.model";

@Injectable({
  providedIn:'root'
})

export class ReviewService {
  constructor(private http:HttpClient) {
  }
  private baseUrl = 'http://localhost:8888/identity/review';

  getAllProduct(productId:string, page :number, size: number): Observable<Review[]>{
    const params = new HttpParams()
      .set('page', page)
      .set('size',size)
    return this.http.get<Review[]>(`${this.baseUrl}/${productId}`,{params});
  }

  save(review:Review): Observable<Review>{
    return this.http.post<Review>(`${this.baseUrl}`,review)
  }


}

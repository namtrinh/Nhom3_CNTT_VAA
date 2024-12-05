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

  getAll(page: number, size: number):Observable<Review[]>{
    const params = new HttpParams()
      .set('page', page.toString() )
      .set('size', size.toString())
    return this.http.get<Review[]>(`${this.baseUrl}`, {params});
  }

  update(reviewId: string, review: Review):Observable<Review>{
    return this.http.put<Review>(`${this.baseUrl}/${reviewId}`, review)
  }

  deleteById(reviewId:string): Observable<Object>{
      return this.http.delete(`${this.baseUrl}/${reviewId}`)
  }

  getAllProduct(productId:string, page :number, size: number): Observable<Review[]>{
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size',size.toString())
    return this.http.get<Review[]>(`${this.baseUrl}/${productId}`,{params});
  }

  save(review:Review): Observable<Review>{
    return this.http.post<Review>(`${this.baseUrl}`,review)
  }

  filter(name:string, rating:number) : Observable<Review[]>{
      const params = new HttpParams()
        .set('name',name)
        .set('rating',rating.toString())
    return this.http.get<Review[]>(`${this.baseUrl}/filter`,{params})
  }


}

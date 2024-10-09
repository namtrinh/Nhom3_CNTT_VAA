import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../model/product.model";
import { Injectable } from "@angular/core";
import { Category } from "../model/category.model";

@Injectable({
    providedIn: 'root'
  })

export class ProductService {

    constructor(private http:HttpClient){}

    private baseUrl = "http://localhost:8888/identity/product"

    getAll():Observable<Product[]>{
        return this.http.get<Product[]>(`${this.baseUrl}`)

    }

    getAllSale():Observable<Product[]>{
      return this.http.get<Product[]>(`${this.baseUrl}/sale`)
    }

    getAllNoSale():Observable<Product[]>{
      return this.http.get<Product[]>(`${this.baseUrl}/ig-sale`)
    }

    getById(product_id:number):Observable<Product>{
        return this.http.get<Product>(`${this.baseUrl}/${product_id}`);
      }

    editById(product_id:number, product:FormData):Observable<Object>{
      return this.http.put(`${this.baseUrl}/${product_id}`,product);
    }
    createProduct(product:Product):Observable<Object>{
      return this.http.post(`${this.baseUrl}`,product);
    }
    deleteProduct(product_id:string): Observable<any>{
      return this.http.delete(`${this.baseUrl}/${product_id}`);
    }

    getProducts(page: number, size: number): Observable<any> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
  
      return this.http.get<any>(`${this.baseUrl}/products`,{params});
    }

    getProductByCategory(category_id:number):Observable<Product[]>{
      const params = new HttpParams()
      .set('category_id', category_id.toString());
      return this.http.get<Product[]>(`${this.baseUrl}/category`,{params})
    }
}
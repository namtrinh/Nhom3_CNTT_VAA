import { HttpClient } from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Category} from "../model/category.model";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private baseUrl = "http://localhost:8888/identity/category";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`)
  }

  getById(category_id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${category_id}`)
  }

  getBySeoTitle(seotitle: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/name/${seotitle}`)
  }

  createCategory(category: Category): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, category)
  }

    editCategory(category_id: string, category: Omit<Category, "products">): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${category_id}`, category)
  }

  deleteCategory(category_id: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${category_id}`)
  }

}

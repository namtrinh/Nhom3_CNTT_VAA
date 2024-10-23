import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Statistic} from "../model/statistic.model";


@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:8888/identity/statistic';

  getAll(): Observable<Statistic[]> {
    return this.http.get<Statistic[]>(`${this.baseUrl}`);
  }

  create(statistic:Statistic): Observable<Object>{
    return this.http.post<Object>(`${this.baseUrl}`,statistic)
  }

  getById(id:string): Observable<Statistic>{
    return this.http.get<Statistic>(`${this.baseUrl}/${id}`,)
  }
}

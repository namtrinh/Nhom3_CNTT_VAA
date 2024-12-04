import { HttpClient } from "@angular/common/http";
import { Permission } from "../model/permission.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private pathUrl="http://localhost:8888/identity/admin/permission"

  constructor(private http: HttpClient){}

  getAllPermissions(): Observable<Permission[]>{
    return this.http.get<Permission[]>(`${this.pathUrl}`);
  }

}


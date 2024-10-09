import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Roles } from '../model/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
    private rolesUrl = "http://localhost:8888/identity/admin/roles";

    constructor(private http: HttpClient){}

    getAllroles(): Observable<Roles[]> {
        return this.http.get<Roles[]>(`${this.rolesUrl}`);
      }
    getById(name:string):Observable<Roles>{
        return this.http.get<Roles>(`${this.rolesUrl}/${name}`);
      }

    editById(name:string, roles:Roles):Observable<Object>{
      return this.http.put(`${this.rolesUrl}/${name}`,roles);
    }
    createroles(role:Roles):Observable<Object>{
      return this.http.post(`${this.rolesUrl}`,role);
    }
    deleteroles(name:string): Observable<any>{
      return this.http.delete(`${this.rolesUrl}/${name}`);
    }

}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private basUrl = "http://localhost:8888/identity/users"
  constructor(private httpClient: HttpClient) { }

  getList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.basUrl}`);
  }
  getById(user_id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.basUrl}/${user_id}`)
  }
  getByRole(role:string): Observable<User[]> {
  return this.httpClient.get<User[]>(`${this.basUrl}/role/${role}`)}

  createUser(user: FormData): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}`, user)
  }
  editUser(user_id: string, user: FormData): Observable<Object> {
    return this.httpClient.put(`${this.basUrl}/${user_id}`, user)
  }
  deleteUser(user_id: string): Observable<Object> {
    return this.httpClient.delete(`${this.basUrl}/${user_id}`)
  }
  getmyinf(): Observable<any>{
    return this.httpClient.get(`${this.basUrl}/myinf`)
  }

  private apiUrl = 'http://localhost:8888/identity/api/images';
  getImage(imageName: string): Observable<Blob> {
    return this.httpClient.get(`${this.apiUrl}/${imageName}`, { responseType: 'blob' });
  }
}

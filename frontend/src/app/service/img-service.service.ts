// image.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
 
  // Thay đổi địa chỉ API nếu cần thiết

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8888/identity/api/images';
  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${imageName}`, { responseType: 'blob' });
  }
}

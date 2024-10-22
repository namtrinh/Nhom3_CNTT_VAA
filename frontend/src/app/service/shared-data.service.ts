import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // Tạo BehaviorSubject mặc định là null
  private dataSubjectA = new BehaviorSubject<any>(null);

  // Biến observable mà component sẽ subscribe
  currentDataA = this.dataSubjectA.asObservable();

  constructor() { }

  // Phương thức cập nhật dữ liệu
  updateDataA(data: any) {
    console.log('Updating data in service:', data);  // Kiểm tra xem dữ liệu có được cập nhật hay không
    this.dataSubjectA.next(data);  // Gửi dữ liệu mới
  }
}

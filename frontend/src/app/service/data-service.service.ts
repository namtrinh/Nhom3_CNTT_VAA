import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<any>(this.getDataFromStorage());
  currentData = this.dataSubject.asObservable();

  changeData(data: any) {
    this.dataSubject.next(data);
    sessionStorage.setItem('promotionData', JSON.stringify(data));
  }

  resetData() {
    this.dataSubject.next(null);
    sessionStorage.removeItem('promotionData');
  }

  private getDataFromStorage() {
    const savedData = sessionStorage.getItem('promotionData');
    return savedData ? JSON.parse(savedData) : null;
  }
}

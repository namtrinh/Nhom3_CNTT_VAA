import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private dataset: any;

  setData(data: any) {
   sessionStorage.setItem('datasets', JSON.stringify(data));
  }

  getData() {
    this.dataset = sessionStorage.getItem('datasets');
    return this.dataset ? JSON.parse(this.dataset) :null
  }

}

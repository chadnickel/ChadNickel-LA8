import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToastService {


  toastChanged: Subject<any> = new Subject<any>();

  constructor() { }


  showToast(type: string, message: string, timeout: number) {
    this.toastChanged.next({
      type: type,
      message: message,
      timeout: timeout
    });
  }
}
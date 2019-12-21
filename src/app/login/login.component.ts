import { Component, OnInit } from '@angular/core';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { LocalStorageService } from '../localStorageService';
import { ToastService } from '../toast/toast.service';

import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
export interface IUser {
  id?: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = { username: '', password: '' };
  localStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');

  }

  ngOnInit() {
    this.currentUser = this.localStorageService.getFromStorage(null);
    if(this.currentUser != null) {
        this.router.navigate(['contacts']);
    }
  }



  login(user: IUser) {
    console.log(user);
    const defaultUser: IUser = { username: 'Chad', password: 'Nickel123' };
    if (user.username !== '' && user.password !== '') {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        // log user in store user in local storea then navigate to contacts 
        this.localStorageService.saveToStorage(user);
        this.router.navigate(['contacts', user]);
      } else {
        // show em some toast
        this.toastService.showToast('warning', 'login failed! please chekc username or password!', 2000);
      }
    } else {
      // show em some toast
      this.toastService.showToast('warning', 'login failed! please specify username and password', 2000);


  }
}
}
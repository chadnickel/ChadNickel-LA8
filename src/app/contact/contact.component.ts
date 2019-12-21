import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http';
import { ThrowStmt } from '@angular/compiler';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../login/login.component';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  contacts: Array<Contact> = [];
  params = '';
  localStorageService: LocalStorageService<Contact>;
  currentUser: IUser;
  constructor(private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.localStorageService = new LocalStorageService('contacts');
  }

  async ngOnInit() {
    const currentUser = this.localStorageService.getFromStorage('user');
    if (currentUser == null) {

      this.router.navigate(['login']);
    }
    this.loadContacts();
    this.activatedRoute.params.subscribe((data: IUser) => {
      console.log('data', data);
      this.currentUser = data;
    });

  }

  async loadContacts() {
    const savedContacts = this.getFromStorage('contacts');
    if (savedContacts.length > 0) {
      this.contacts = savedContacts;
    } else {
      this.contacts = await this.loadItemsFromFile();
    }
    this.sortById(this.contacts);
  }


  async loadItemsFromFile() {
    const data = await this.http.get('assets/contacts.json').toPromise();
    console.log('from data', data.json());
    return data.json();
  }

  addContact() {
    this.contacts.unshift(new Contact({
      id: null,
      firstName: null,
      lastName: null,
      phone: null,
      email: null
    }));
    console.log('this is contact array', this.contacts);
  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.saveToStorage(this.contacts);

  }
  saveContact(contact: Contact) {
    let hasError = false;
    Object.keys(contact).forEach((key: any) => {
      if (contact[key] == null) {
        hasError = true;
        this.toastService.showToast('danger', `Save Failed property ${key} must not be null`, 2000);
      }

    });

    if (hasError) {

    } else {
      contact.editing = false;
      this.saveToStorage(this.contacts);

    }

  }

  saveToStorage(contacts: Array<Contact>) {
    contacts = this.sortById(contacts);
    return this.localStorageService.saveToStorage(contacts);
    // const savedContacts = localStorage.setItem('contacts', JSON.stringify(contacts));

    // console.log('from saved', savedContacts);
    // return savedContacts;
  }

  getFromStorage(key: string) {
    const savedContacts = JSON.parse(localStorage.getItem(key));
    return this.localStorageService.getFromStorage(key);
    return savedContacts;


  }

  searchContact(params: string) {
    console.log('from params', params);

    this.contacts = this.contacts.filter((item: Contact) => {
      const fullName = item.firstName + ' ' + item.lastName;
      if (params === fullName || params === item.firstName || params === item.lastName) {
        return true;
      } else {
        return false;
      }

    });


  }


  sortById(contacts: Array<Contact>) {
    contacts.sort((a: Contact, b: Contact) => {
      return a.id > b.id ? 1 : -1;
    });
    return contacts;
  }



  logout() {
    //  lear locoal then nav to login
    this.localStorageService.clearItemsFromLocalstorage('user');
    this.router.navigate(['']);
  }
}


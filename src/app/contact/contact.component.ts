import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  contacts: Array<Contact> = [];
  params = '';
  constructor(private http: Http) { }

  async ngOnInit() {
    this.loadContacts();
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
    this.contacts.unshift(new Contact({}));
    console.log('this is contact array', this.contacts);
  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.saveToStorage(this.contacts);

  }
  saveContact(contact: Contact) {
    console.log('from save contact', contact);
    contact.editing = false;
    this.saveToStorage(this.contacts);
  }

  saveToStorage(contacts: Array<Contact>) {
    contacts = this.sortById(contacts);
    const savedContacts = localStorage.setItem('contacts', JSON.stringify(contacts));

    console.log('from saved', savedContacts);
    return savedContacts;
  }

  getFromStorage(key: string) {
    const savedContacts = JSON.parse(localStorage.getItem(key));
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
}


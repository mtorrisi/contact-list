import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {
  private contactsUrl = '/api/contacts';
  constructor(private http: Http) { }

  getContacts(): Promise<void | Contact[]> {
    return this.http.get(this.contactsUrl)
      .toPromise()
      .then(response => response.json() as Contact[])
      .catch(this.handleError);
  }

  // post("/api/contacts")
  createContact(newContact: Contact): Promise<void | Contact> {
    return this.http.post(this.contactsUrl, newContact)
     .toPromise()
     .then(response => response.json() as Contact)
     .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}

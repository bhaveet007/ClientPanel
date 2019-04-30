import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, 
AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Client } from '../models/Client';
//import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', 
    ref => ref.orderBy('lastName', 'asc'));
   }

   getClients(): Observable<Client[]> {
      // Get the clients with the id
     this.clients = this.clientsCollection.snapshotChanges().pipe(map(
       changes => {
         return changes.map(action => {
           const data = action.payload.doc.data() as Client;
           data.id = action.payload.doc.id;
           return data;
         });
       }));

      return this.clients;
     }
    newClient(client: Client) {
      this.clientsCollection.add(client);
    }

}
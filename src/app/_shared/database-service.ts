import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Observable, Subject} from 'rxjs';
import {s} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db;

  constructor() {
    this.db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    this.db.settings(settings);
  }

  public storeCharacterNotes(charId, charNotes) {
    const docRef = this.db.collection('characters').doc(charId);
    docRef.set({
      notes: charNotes
    });
  }

  public getCharacterNotes(charId): Observable<string> {
    const result = new Subject<string>();
    const docRef = this.db.collection('characters').doc(charId);
    docRef.get().then(doc => {
      if (doc.exists) {
        result.next(doc.data()['notes']);
        result.complete();
      } else {
        console.log('Data not found!');
      }
    }).catch(function(error) {
      console.log('Error getting data:', error);
    });
    return result;
  }

  public storeShipNotes(id, notes) {
    const docRef = this.db.collection('ships').doc(id);
    docRef.set({
      notes: notes
    });
  }

  public getShipNotes(id): Observable<string> {
    const result = new Subject<string>();
    const docRef = this.db.collection('ships').doc(id);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        result.next(doc.data()['notes']);
        result.complete();
      } else {
        console.log('Data not found!');
      }
    }).catch(function(error) {
      console.log('Error getting data:', error);
    });
    return result;
  }

  public storeLocationNotes(id, notes) {
    const docRef = this.db.collection('locations').doc(id);
    docRef.set({
      notes: notes
    });
  }

  public getLocationNotes(id): Observable<string> {
    const result = new Subject<string>();
    const docRef = this.db.collection('locations').doc(id);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        result.next(doc.data()['notes']);
        result.complete();
      } else {
        console.log('Data not found!');
      }
    }).catch(function(error) {
      console.log('Error getting data:', error);
    });
    return result;
  }

  public storeAdventureNotes(id, notes) {
    const docRef = this.db.collection('adventures').doc(id);
    docRef.set({
      notes: notes
    });
  }

  public getAdventureNotes(id): Observable<string> {
    const result = new Subject<string>();
    const docRef = this.db.collection('adventures').doc(id);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        result.next(doc.data()['notes']);
        result.complete();
      } else {
        console.log('Data not found!');
      }
    }).catch(function(error) {
      console.log('Error getting data:', error);
    });
    return result;
  }
}



import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Observable, Subject} from 'rxjs';
import {s} from '@angular/core/src/render3';
import {DataType} from './dsa-link/dsa-link.component';

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

  public getData(type: DataType, id: string, field: string):
    Observable<{'data': string, 'read_permissions': string[], 'write_permissions': string[]}> {
    const result = new Subject<{ 'data': string, 'read_permissions': string[], 'write_permissions': string[]}>();

    const docRef = this.db.collection(this.lookupCollection(type)).doc(id);
    docRef.get().then(doc => {
      if (doc.exists) {
        result.next({
          'data': doc.data()[field],
          'read_permissions': doc.data()[field + '_read'],
          'write_permissions': doc.data()[field + '_write']
        });
        result.complete();
      } else {
        console.log('Data not found! ( ' + this.lookupCollection(type) + ' / ' + id + ' / ' + field + ' )');
      }
    }).catch(function(error) {
      console.log('Error getting data:', error);
    });

    return result;
  }

  public getPermissions(type: DataType, id: string): Observable<string[]> {
    const result = new Subject<string[]>();

    const docRef = this.db.collection(this.lookupCollection(type)).doc(id);
    docRef.get().then(doc => {
      if (doc.exists) {
        result.next( doc.data()['permissions']);
        result.complete();
      } else {
        console.log('Data not found! ( ' + this.lookupCollection(type) + ' / ' + id + ' )');
      }
    }).catch(function(error) {
      console.log('Error getting data:', error);
    });

    return result;
  }

  public getPdfPermissions(type: DataType, id: string): Observable<string[]> {
    const result = new Subject<string[]>();

    const docRef = this.db.collection(this.lookupCollection(type)).doc(id);
    docRef.get().then(doc => {
      if (doc.exists) {
        result.next( doc.data()['pdf_permissions']);
        result.complete();
      } else {
        console.log('Data not found! ( ' + this.lookupCollection(type) + ' / ' + id + ' )');
      }
    }).catch(function(error) {
      console.log('Error getting data:', error);
    });

    return result;
  }

  public getDataMap(dataType: DataType): Observable<Map<string, {name: string, category: string}>> {
    const result = new Subject<Map<string, {name: string, category: string}>>();

    const map = new Map<string, {name: string, category: string}>();
    const dataRef = this.db.collection(this.lookupCollection(dataType));
    dataRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          map.set(doc.id,
            {name: doc.data()['name'],
            category: doc.data()['category']});
        });
        result.next(map);
        result.complete();
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

    return result;
  }

  public storeData(type: DataType, id: string, field: string, data: any) {
    const docRef = this.db.collection(this.lookupCollection(type)).doc(id);
    const update = {};
    update[field] = data;
    docRef.update(update);
  }

  public getUserRoles(email: string):
    Observable<string[]> {
    const result = new Subject<string[]>();

    const docRef = this.db.collection('users').doc(email);
    docRef.get().then(doc => {
      if (doc.exists) {
        result.next(
          doc.data()['roles']
        );
        result.complete();
      } else {
        console.log('Data not found! ( roles of ' + email + ' )');
      }
    }).catch(function(error) {
      console.log('Error getting data:', error);
    });

    return result;
  }

  private lookupCollection(type: DataType): string {
    switch (type) {
      case DataType.CHARACTER:
        return 'characters';
      case DataType.SHIP:
        return 'ships';
      case DataType.ADVENTURE:
        return 'adventures';
      case DataType.LOCATION:
        return 'locations';
    }
  }

}



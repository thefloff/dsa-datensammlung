import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private needsNameUpdate: string;

  private currentUser: firebase.User;
  private roles = null;

  private $userObservable = new Subject<firebase.User>();

  constructor(private http: HttpClient) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        if (this.needsNameUpdate) {
          this.setName(this.needsNameUpdate);
          this.needsNameUpdate = null;
        }
      } else {
        this.currentUser = null;
      }
      this.$userObservable.next(this.currentUser);
    });

    this.http.get('assets/roles.json').subscribe((response) => {
      if (response) {
        this.roles = response;
      }
    });
  }

  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
      console.log('ERROR! (' + error.code + '): ' + error.message);
      return false;
    });
    return true;
  }

  register(username, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
      console.log('ERROR! (' + error.code + '): ' + error.message);
      return false;
    });
    this.needsNameUpdate = username;
    return true;
  }

  private setName(username) {
    this.currentUser.updateProfile({
      displayName: String(username),
      photoURL: ''
    });
  }

  signout() {
    firebase.auth().signOut().then(() => {
      return true;
    }).catch(error => {
      return false;
    });
  }

  getUser() {
    return this.$userObservable;
  }

  hasPermission(necessary: string[]) {
    if (necessary.length === 0) {
      return true;
    }
    if (!this.currentUser) {
      return false;
    }
    const hasSet = new Set(this.roles[this.currentUser.email]);
    necessary = necessary.filter(x => hasSet.has(x));
    return necessary.length > 0;
  }

  canGet(jsonData: JSON, field: string): boolean {
    if (!jsonData[field]) {
      return false;
    }
    return (!jsonData[field]['permissions'] || this.hasPermission(jsonData[field]['permissions']));
  }

}
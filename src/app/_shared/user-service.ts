import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {DatabaseService} from './database-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private needsNameUpdate: string;

  private currentUser: firebase.User;
  private userRoles: string[] = [];

  private $userObservable = new Subject<firebase.User>();

  private $rolesChanged = new Subject<string>();

  constructor(private http: HttpClient,
              private database: DatabaseService) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        if (this.needsNameUpdate) {
          this.setName(this.needsNameUpdate);
          this.needsNameUpdate = null;
        }
        this.getUserRoles(this.currentUser.email);
      } else {
        this.currentUser = null;
        this.getUserRoles(null);
      }
      this.$userObservable.next(this.currentUser);
    });
  }

  public login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    }).catch(error => {
      console.log('ERROR! (' + error.code + '): ' + error.message);
      return false;
    });
    return true;
  }

  public register(username, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    }).catch(error => {
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

  public signout() {
    firebase.auth().signOut().then(() => {
      return true;
    }).catch(error => {
      return false;
    });
  }

  public getUser() {
    return this.$userObservable;
  }

  public onUserChange() {
    return this.$rolesChanged;
  }

  public userIsAdmin(): boolean {
    return this.userRoles.indexOf('admin') !== -1;
  }

  public hasPermission(necessary: string[]) {
    if (this.userIsAdmin()) {
      return true;
    }
    if (!necessary) {
      return false;
    }
    if (necessary.length === 0) {
      return true;
    }
    if (!this.currentUser) {
      return false;
    }
    const hasSet = new Set(this.userRoles);
    necessary = necessary.filter(x => hasSet.has(x));
    return necessary.length > 0;
  }

  public canGet(jsonData: JSON, field: string): boolean {
    if (!jsonData[field]) {
      return false;
    }
    return (!jsonData[field]['permissions'] || this.hasPermission(jsonData[field]['permissions']));
  }

  private getUserRoles(email: string) {
    if (!email) {
      this.userRoles = [];
      this.$rolesChanged.next();
    } else {
      this.database.getUserRoles(email).subscribe((roles) => {
        this.userRoles = roles;
        this.$rolesChanged.next();
      });
    }
  }

}

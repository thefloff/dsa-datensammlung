import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as firebase from 'firebase';

@Component({
  selector: 'dsa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('DSA - Datensammlung');

    const config = {
      apiKey: 'AIzaSyBKgB_y-bCDoyJINxbfU3SWR2KxQfvGEmU',
      authDomain: 'dsa-datensammlung.firebaseapp.com',
      databaseURL: 'https://dsa-datensammlung.firebaseio.com',
      projectId: 'dsa-datensammlung',
      storageBucket: 'dsa-datensammlung.appspot.com',
      messagingSenderId: '998339983385'
    };
    firebase.initializeApp(config);
  }
}

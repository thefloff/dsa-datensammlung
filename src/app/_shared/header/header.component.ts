import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { UserService } from '../user-service';
import * as firebase from 'firebase';

@Component({
  selector: 'dsa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: firebase.User;

  constructor(private modalService: NgbModal,
              public userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  openLoginForm() {
    this.modalService.open(LoginFormComponent);
  }

  openRegisterForm() {
    this.modalService.open(RegisterFormComponent);
  }

}

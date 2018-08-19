import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user-service';

@Component({
  selector: 'dsa-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email_input: string;
  password_input: string;

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService) {}

  ngOnInit() {}

  submitLoginForm() {
    if (this.userService.login(this.email_input, this.password_input)) {
      this.activeModal.close();
    }
  }
}

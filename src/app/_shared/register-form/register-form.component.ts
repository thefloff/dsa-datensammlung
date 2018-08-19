import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user-service';

@Component({
  selector: 'dsa-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  name_input: string;
  email_input: string;
  password_input: string;

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService) {}

  ngOnInit() {}

  submitRegisterForm() {
    if (this.userService.register(this.name_input, this.email_input, this.password_input)) {
      this.activeModal.close();
    }
  }
}

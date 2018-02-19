import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { User } from '../../../models/user.model.client';

import { UserService } from '../../../services/user.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  @ViewChild('f') registerForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String; // see usage as two-way data binding
  firstname: String;
  lastname: String;

  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.firstname = this.registerForm.value.firstname;
    this.lastname = this.registerForm.value.lastname;

    this.user = {
      _id: (new Date()).getTime() + '',
      username: this.username,
      password: this.password,
      firstName: this.firstname,
      lastName: this.lastname
    };

    console.log((new Date()).getTime());
    console.log(this.user);

    this.userService.createUser(this.user);
    this.router.navigate(['/user', this.user._id]);
  }

  ngOnInit() {
  }

}

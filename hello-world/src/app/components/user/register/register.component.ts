import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';

import { UserService } from '../../../services/user.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String;
  password2: String;
  firstname: String;
  lastname: String;

  errorFlag: boolean;
  errorMsg = 'Please enter matching passwords!';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.password2 = this.registerForm.value.password2;
    this.firstname = this.registerForm.value.firstname;
    this.lastname = this.registerForm.value.lastname;

    if (this.password !== this.password2) {
      this.errorFlag = true;
    } else {


    const newUser = {
      username: this.username,
      password: this.password,
      firstName: this.firstname,
      lastName: this.lastname
    };

    this.userService.createUser(newUser)
      .subscribe((user: any) => {
        this.userService.findUserByCredentials(user.username, user.password)
          .subscribe((responseUser: any) => {
            const _id = responseUser._id;
            this.router.navigate(['/user', _id]);
          });
    });
  }}

  ngOnInit() {
  }

}

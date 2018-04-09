import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';

import { UserService } from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';

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
  error: String;

  constructor(private userService: UserService, private router: Router, private sharedService: SharedService) {}

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.password2 = this.registerForm.value.password2;
    this.firstname = this.registerForm.value.firstname;
    this.lastname = this.registerForm.value.lastname;

    if (this.password !== this.password2) {
      this.errorFlag = true;
    } else {

      this.userService.register(this.username, this.password, this.firstname, this.lastname)
        .subscribe(
          (data: any) => {
            this.sharedService.user = data;
            this.router.navigate(['/user', data._id]);
          },
          (error: any) => {
            this.error = error._body;
          }
        );
    }
  }

  ngOnInit() {
  }

}

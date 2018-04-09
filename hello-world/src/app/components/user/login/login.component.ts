import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String; // see usage as two-way data binding

  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router, private sharedService: SharedService) {}

  /*login(username: String, password: String) {
    //alert('username: ' + username);
   // if (username === 'alice' && password == "qqq") {
      const user: User = this.userService.findUserByCredential(username, password);
      if (user) {
        this.router.navigate(['/profile', user._id ]);
      }
   // }
  }*/

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.login(this.username, this.password)
      .subscribe(
        (user: any) => {
          this.sharedService.user = user;
          this.router.navigate(['/user', user._id]);
        },
        (error: any) => {
          this.errorFlag = true;
        });
  }

  ngOnInit() {
  }

}

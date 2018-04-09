import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {};
  username: String;
  password: String;
  firstName: String;
  lastName: String;
  email: String;
  userId: String;

  constructor(
    private userService: UserService, private router: Router, private sharedService: SharedService) { }

  updateUser(user) {
    this.userService.updateUser(user)
      .subscribe();
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  getUser() {
    this.user = this.sharedService.user;
    this.username = this.user['username'];
    this.password = this.user['password'];
    this.firstName = this.user['firstName'];
    this.lastName = this.user['lastName'];
    this.email = this.user['email'];
    this.userId = this.user['_id'];
  }

  deleteUser() {
    this.userService.deleteUser(this.userId)
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  ngOnInit() {
    this.getUser();
    /*
    this.router.params.subscribe(params => {
      // alert('userId is' + this.userId);
      this.userService.findUserById(params['uid'])
        .subscribe((user: any) => {
          this.user = user;
        });
    }); */
  }

}

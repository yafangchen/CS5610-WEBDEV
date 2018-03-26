import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {_id: '', username: '', password: '', firstName: '', lastName: ''};

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }

  updateUser(user) {
    this.userService.updateUser(user)
      .subscribe();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      // alert('userId is' + this.userId);
      this.userService.findUserById(params['uid'])
        .subscribe((user: any) => {
          this.user = user;
        });
    });
  }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {SharedService} from './shared.service';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router, private sharedService: SharedService) {}

  baseUrl = environment.baseUrl;
  options = {
    params: new HttpParams()
  };

  login(username: String, password: String) {
    const body = {
      username : username,
      password : password
    };
    return this.httpClient.post(this.baseUrl + '/api/login', body, {withCredentials: true});
  }

  logout() {
    this.options.params.set('withCredentials', 'true');
    this.options.params.set('responseType', 'text');
    console.log(this.options);
    return this.httpClient.post(this.baseUrl + '/api/logout', '', {
      withCredentials: true,
      responseType: 'text'
    });
  }

  register(username: String, password: String, firstName: String, lastName: String) {
    const user = {
      username : username,
      password : password,
      firstName: firstName,
      lastName: lastName
    };
    return this.httpClient.post(this.baseUrl + '/api/register', user, {withCredentials: true});
  }

  loggedIn() {
    return this.httpClient.post(this.baseUrl + '/api/loggedIn', '', {withCredentials: true})
      .subscribe((user: any) => {
        if (user !== 0) {
          this.sharedService.user = user; // setting user so as to share with all components
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }

  createUser(user) {
    return this.httpClient.post(this.baseUrl + '/api/user', user);
  }

  findUserByCredentials(username: String, password: String) {
    return this.httpClient.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password);
  }

  findUserById(userId: String) {
    return this.httpClient.get(this.baseUrl + '/api/user/' + userId);
  }

  updateUser(user) {
    return this.httpClient.put(this.baseUrl + '/api/user/' + user._id, user);
  }

  deleteUser(userId: String) {
    return this.httpClient.delete(this.baseUrl + '/api/user/' + userId);
  }
}

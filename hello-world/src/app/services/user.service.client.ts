import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

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

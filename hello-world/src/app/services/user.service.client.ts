import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  createUser(user: User) {
    return this.httpClient.post<User>(this.baseUrl + '/api/user', user);
  }

  findUserByCredentials(username: String, password: String) {
    return this.httpClient.get<User>(this.baseUrl + '/api/user?username=' + username + '&password=' + password);
  }

  findUserById(userId: String) {
    return this.httpClient.get<User>(this.baseUrl + '/api/user/' + userId);
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(this.baseUrl + '/api/user/' + user._id, user);
  }

  deleteUser(userId: String) {
    return this.httpClient.delete<User>(this.baseUrl + '/api/user/' + userId);
  }
}

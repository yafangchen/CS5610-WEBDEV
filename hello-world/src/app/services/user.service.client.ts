import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  users: User[] = [
    new User('123', 'alice', 'qq', 'alice', 'Wonder1'),
    new User('234', 'bob', 'qq', 'Bob', 'Wonder2'),
    new User('345', 'charlie', 'qq', 'Charlie', 'Wonder3'),
    new User('456', 'jannunzi', 'qq', 'Jose', 'Wonder4')
  ];

  createUser(user: User) {
    this.users.push(user);
  }

  findUserByCredentials(username: String, password: String) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username && this.users[i].password === password) {
        return this.users[i];
      }
    }
  }

  findUserByCredentials2(username: String, password: String) {
    return this.users.find( function (user) {
      return user.username === username && user.password === password;
    });
  }

  findUserById(userId: String) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === userId) {
        return this.users[i];
      }
    }
  }

  findUserById2(userId: String) {
    return this.users.find(function(user){
      return user._id === userId;
    });
  }

  updateUser(user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === user._id) {
        this.users[i].firstName = user.firstName;
        this.users[i].lastName = user.lastName;
        return this.users[i];
      }
    }
  }

  deleteUser(userId: String) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === userId) {
        return this.users.splice(i, 1);
      }
    }
  }
}

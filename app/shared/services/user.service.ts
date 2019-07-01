import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';
import { Global} from '../global';

@Injectable()
export class UserService {
  readonly rootUrl = Global.BASE_USER_ENDPOINT;
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      UserId:  user.UserId,
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      RoleId: user.RoleId,
      GroupId: user.GroupId,
      Active: user.Active,
      Department: user.Department
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.rootUrl + '/api/GetUsers');
  }

  updateUser(id: number, user: User): Observable<User> {
      let body = JSON.stringify(user);
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.put<User>(this.rootUrl + '/update/' + id, body, httpOptions);
  }
}
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

  registerUser(user: User): Observable<User> {
    const input: User = {
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
    let body = JSON.stringify(input);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<User>(this.rootUrl + '/api/User/Register', body, httpOptions);
  }

  userAuthentication(userName, password): Observable<any> {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'No-Auth':'True'});
    //  reqHeader.append('Access-Control-Allow-Origin', '*');
    reqHeader.append('Content-Type', 'application/x-www-urlencoded');
    //  reqHeader.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    return this.http.post<any>(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims() : Observable<any>{
   return  this.http.get<any>(this.rootUrl+'/api/GetUserClaims');
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

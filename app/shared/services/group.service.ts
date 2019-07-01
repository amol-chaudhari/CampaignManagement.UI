import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Group } from '../models/group.model';
import { Global} from '../global';

@Injectable()
export class GroupService {
    readonly rootUrl = Global.BASE_USER_ENDPOINT + '/api/' +'Groups';
    constructor(private http: HttpClient) { }

    getGroups(): Observable<Group[]> {
        return this.http.get<Group[]>(this.rootUrl);
    }
    
    createGroup(group: Group): Observable<Group> {
        let body = JSON.stringify(group);
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Group>(this.rootUrl + '/insert/', body, httpOptions);
    }

    updateGroup(id: number, group: Group): Observable<Group> {
        let body = JSON.stringify(group);
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<Group>(this.rootUrl + '/update/' + id, body, httpOptions);
    }
}
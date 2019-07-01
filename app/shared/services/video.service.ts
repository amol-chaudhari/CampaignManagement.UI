import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Video } from '../models/video.model';
import { Global} from '../global';

@Injectable()
export class VideoService {
    readonly rootUrl =  Global.BASE_USER_ENDPOINT + '/api/' +'Videos';
    constructor(private http: HttpClient) { }

    getVideos(): Observable<Video[]> {
        return this.http.get<Video[]>(this.rootUrl);
    }
    
    createVideo(video: Video): Observable<Video> {
        let body = JSON.stringify(video);
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Video>(this.rootUrl + '/insert/', body, httpOptions);
    }

    updateVideo(id: number, video: Video): Observable<Video> {
        let body = JSON.stringify(video);
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<Video>(this.rootUrl + '/update/' + id, body, httpOptions);
    }

    postFile(fileToUpload: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        const httpOptions = { headers: new HttpHeaders() };//{ 'Content-Type': 'multipart/form-data' }
        return this.http
          .post<any>(this.rootUrl + '/uploadfile', formData, httpOptions);
    }
}
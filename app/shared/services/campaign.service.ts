import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Campaign, UserCampaign } from '../models/campaign.model';
import { Global} from '../global';

@Injectable()
export class CampaignService {
  readonly rootUrl = Global.BASE_USER_ENDPOINT + '/api/' +'Campaigns';
  constructor(private http: HttpClient) { }

  getAllCampaign(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.rootUrl);
  }

  getCampaignById(campaignId: string): Observable<Campaign> {
    return this.http.get<Campaign>(this.rootUrl + '/details/' + campaignId);
  }
  
  createCampaign(campaign: Campaign): Observable<Campaign> {
    let body = JSON.stringify(campaign);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Campaign>(this.rootUrl + '/insert/', body, httpOptions);
  }

  updateCampaign(id: number, campaign: Campaign): Observable<Campaign> {
    let body = JSON.stringify(campaign);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Campaign>(this.rootUrl + '/update/' + id, body, httpOptions);
  }

  publishCampaign(campaign: Campaign): Observable<Campaign> {
    let body = JSON.stringify(campaign);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Campaign>(this.rootUrl + '/publish/' + campaign.GroupId, body, httpOptions);
  }

  getInbox(): Observable<UserCampaign[]> {
    return this.http.get<UserCampaign[]>(this.rootUrl + '/inbox');
  }
}

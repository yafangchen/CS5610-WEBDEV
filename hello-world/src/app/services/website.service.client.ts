import { Website } from '../models/website.model.client';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class WebsiteService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  createWebsite(userId: String, website: Website) {
    return this.httpClient.post<Website>(this.baseUrl + '/api/user/' + userId + '/website', website);
  }

  findWebsitesByUser(userId: String) {
    return this.httpClient.get<Website[]>(this.baseUrl + '/api/user/' + userId + '/website');
  }

  findWebsiteById(websiteId: String) {
    return this.httpClient.get<Website>(this.baseUrl + '/api/website/' + websiteId);
  }

  updateWebsite(websiteId: String, website: Website) {
    return this.httpClient.put<Website>(this.baseUrl + '/api/website/' + websiteId, website);
  }

  deleteWebsite(websiteId: String) {
    return this.httpClient.delete<Website>(this.baseUrl + '/api/website/' + websiteId);
  }
}


import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class WebsiteService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  createWebsite(userId: String, website: any) {
    return this.httpClient.post(this.baseUrl + '/api/user/' + userId + '/website', website);
  }

  findWebsitesByUser(userId: String) {
    return this.httpClient.get(this.baseUrl + '/api/user/' + userId + '/website');
  }

  findWebsiteById(websiteId: String) {
    return this.httpClient.get(this.baseUrl + '/api/website/' + websiteId);
  }

  updateWebsite(websiteId: String, website: any) {
    return this.httpClient.put(this.baseUrl + '/api/website/' + websiteId, website);
  }

  deleteWebsite(websiteId: String) {
    return this.httpClient.delete(this.baseUrl + '/api/website/' + websiteId);
  }
}

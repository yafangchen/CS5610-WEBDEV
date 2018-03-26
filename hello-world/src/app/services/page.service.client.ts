import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class PageService {

  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  createPage(websiteId, page) {

    return this.httpClient.post(this.baseUrl + '/api/website/' + websiteId + '/page', page);
  }

  findPageByWebsiteId(websiteId: String) {
    return this.httpClient.get(this.baseUrl + '/api/website/' + websiteId + '/page');
  }

  findPageById(pageId: String) {
    return this.httpClient.get(this.baseUrl + '/api/page/' + pageId);
  }

  updatePage(pageId, page) {
    return this.httpClient.put(this.baseUrl + '/api/page/' + pageId, page);
  }

  deletePage(pageId: String) {
    return this.httpClient.delete(this.baseUrl + '/api/page/' + pageId);
  }
}

import { Page } from '../models/page.model.client';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class PageService {

  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  createPage(websiteId: String, page: Page) {

    return this.httpClient.post<Page>(this.baseUrl + '/api/website/' + websiteId + '/page', page);
  }

  findPageByWebsiteId(websiteId: String) {
    return this.httpClient.get<Page[]>(this.baseUrl + '/api/website/' + websiteId + '/page');
  }

  findPageById(pageId: String) {
    return this.httpClient.get<Page>(this.baseUrl + '/api/page/' + pageId);
  }

  updatePage(pageId: String, page: Page) {
    return this.httpClient.put<Page>(this.baseUrl + '/api/page/' + pageId, page);
  }

  deletePage(pageId: String) {
    return this.httpClient.delete<Page>(this.baseUrl + '/api/page/' + pageId);
  }
}

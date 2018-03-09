import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export  class WidgetService {

  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  createWidget(pageId, widget) {
    return this.httpClient.post<Widget>(this.baseUrl + '/api/page/' + pageId + '/widget', widget);
  }

  findWidgetsByPageId(pageId: String) {
    console.log(pageId);
    return this.httpClient.get<Widget[]>(this.baseUrl + '/api/page/' + pageId + '/widget');
  }

  findWidgetById(widgetId: String) {
    return this.httpClient.get<Widget>(this.baseUrl + '/api/widget/' + widgetId);
  }

  updateWidget(widgetId, widget) {
    return this.httpClient.put<Widget>(this.baseUrl + '/api/widget/' + widgetId, widget);
  }

  deleteWidget(widgetId: String) {
    return this.httpClient.delete<Widget>(this.baseUrl + '/api/widget/' + widgetId);
  }
}

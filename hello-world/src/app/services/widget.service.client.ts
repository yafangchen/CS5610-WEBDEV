import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export  class WidgetService {

  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  createWidget(pageId, widget) {
    return this.httpClient.post(this.baseUrl + '/api/page/' + pageId + '/widget', widget);
  }

  findWidgetsByPageId(pageId: String) {
    console.log(pageId);
    return this.httpClient.get(this.baseUrl + '/api/page/' + pageId + '/widget');
  }

  findWidgetById(widgetId: String) {
    return this.httpClient.get(this.baseUrl + '/api/widget/' + widgetId);
  }

  updateWidget(widgetId, widget) {
    return this.httpClient.put(this.baseUrl + '/api/widget/' + widgetId, widget);
  }

  deleteWidget(widgetId: String) {
    return this.httpClient.delete(this.baseUrl + '/api/widget/' + widgetId);
  }

  reorderWidgets(pageId, startIndex, endIndex) {

    const url = this.baseUrl + '/api/page/' + pageId + '/widget?start=' + startIndex + '&end=' + endIndex;
    return this.httpClient.put(url, '');
  }
}

import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';

@Injectable()
export  class WidgetService {

  // constructor(_id:String, type:String, pageId:String, size= '1', text = 'text', url = 'url', width = '100%')
  widgets: Widget[] = [
    new Widget('123', 'HEADER', '321', '2', 'GIZMODO'),
    new Widget('234', 'HEADER', '321', '2', 'GIZMODO'),
    new Widget('345', 'IMAGE', '321', '2', 'text', '100%', 'http://lorempixel.com/400/200/'),
    new Widget('456', 'HTML', '321', '2', '<p>blalbla</p>'),
    new Widget('567', 'YOUTUBE', '321', '2', 'text', '100%', 'https://youtube.com/embed/APexI9Zb6iE')
  ];

  createWidget(pageId, widget) {

    const new_widget = {
      _id: (new Date()).getTime() + '',
      widgetType: widget.widgetType,
      pageId: pageId,
      size: widget.size,
      text: widget.text,
      url: widget.url,
      width: widget.width
    };

    this.widgets.push(new_widget);
  }

  findWidgetsByPageId(pageId: String) {
    const resultSet = [];
    for ( const i in this.widgets) {
      if (this.widgets[i].pageId === pageId) {
        resultSet.push(this.widgets[i]);
      }
    }
    return resultSet;
  }

  findWidgetsByPageId2(pageId: String) {
    return this.widgets.filter(function (widget) {
      return widget.pageId === pageId;
    });
  }

  findWidgetById(widgetId: String) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }

  updateWidget(widgetId, widget) {
    for ( const i in this.widgets ) {
      if ( this.widgets[i]._id === widgetId ) {
        switch (widget.widgetType) {
          case 'HEADER':
            this.widgets[i].text = widget.text;
            this.widgets[i].size = widget.size;
            return true;

          case 'IMAGE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;

          case 'YOUTUBE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;
        }

      }
    }
    return false;
  }

  deleteWidget(widgetId: String) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        const j = +i;
        this.widgets.splice(j, 1);
        break;
      }
    }
  }
}

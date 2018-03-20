import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Widget} from '../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

  @ViewChild('f') widgetEditForm: NgForm;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget;
  htmlText: String;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];
      }
    );

    this.widgetService.findWidgetById(this.widgetId)
      .subscribe(widget => {
        this.widget = widget;
        if (this.widget != null) {
          this.htmlText = this.widget.text;
        }
      });
  }

  editWidget() {
    this.htmlText = this.widgetEditForm.value.htmlText;
    if (this.widget == null) {
      const new_widget = {
        _id: (new Date()).getTime() + '',
        widgetType: 'HTML',
        pageId: this.pageId,
        text: this.htmlText
      };
      this.widgetService.createWidget(this.pageId, new_widget).subscribe();
    } else {
      const new_widget = {
        _id: this.widgetId,
        widgetType: 'HTML',
        pageId: this.pageId,
        text: this.htmlText
      };
      this.widgetService.updateWidget(this.widgetId, new_widget).subscribe();
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe();
  }

}

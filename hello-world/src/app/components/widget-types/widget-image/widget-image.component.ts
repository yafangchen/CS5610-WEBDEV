import {Component, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  @ViewChild('f') widgetEditForm: NgForm;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget;
  imageText: String;
  imageURL: String;
  imageWidth: String;
  baseUrl: String;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];
        console.log(this.widgetId);
      }
    );

    this.widgetService.findWidgetById(this.widgetId)
      .subscribe(widget => {
        this.widget = widget;
        if (this.widget != null) {
          this.imageText = this.widget.text;
          this.imageURL = this.widget.url;
          this.imageWidth = this.widget.width;
        }
      });
  }

  editWidget() {
    this.imageText = this.widgetEditForm.value.imageText;
    this.imageURL = this.widgetEditForm.value.imageURL;
    this.imageWidth = this.widgetEditForm.value.imageWidth;
    if (this.widget == null) {
      const new_widget = {
        _id: (new Date()).getTime() + '',
        widgetType: 'IMAGE',
        pageId: this.pageId,
        text: this.imageText,
        url: this.imageURL,
        width: this.imageWidth
      };
      this.widgetService.createWidget(this.pageId, new_widget).subscribe();
    } else {
      const new_widget = {
        _id: this.widgetId,
        widgetType: 'IMAGE',
        pageId: this.pageId,
        text: this.imageText,
        url: this.imageURL,
        width: this.imageWidth
      };
      this.widgetService.updateWidget(this.widgetId, new_widget).subscribe();
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe();
  }
}

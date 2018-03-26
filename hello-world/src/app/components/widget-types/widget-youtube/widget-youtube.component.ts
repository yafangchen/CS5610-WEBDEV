import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  @ViewChild('f') widgetEditForm: NgForm;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: {widgetType: '', pageId: '', text: '', url: '', width: ''};
  youtubeText: String;
  youtubeURL: String;
  youtubeWidth: String;

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
      .subscribe((widget: any) => {
        this.widget = widget;
        if (this.widget != null) {
          this.youtubeText = this.widget.text;
          this.youtubeURL = this.widget.url;
          this.youtubeWidth = this.widget.width;
        }
      });
  }

  editWidget() {
    this.youtubeText = this.widgetEditForm.value.youtubeText;
    this.youtubeURL = this.widgetEditForm.value.youtubeURL;
    this.youtubeWidth = this.widgetEditForm.value.youtubeWidth;
    if (this.widget == null) {
      const new_widget = {
        widgetType: 'YOUTUBE',
        pageId: this.pageId,
        text: this.youtubeText,
        url: this.youtubeURL,
        width: this.youtubeWidth
      };
      this.widgetService.createWidget(this.pageId, new_widget).subscribe();
    } else {
      const new_widget = {
        widgetType: 'YOUTUBE',
        pageId: this.pageId,
        text: this.youtubeText,
        url: this.youtubeURL,
        width: this.youtubeWidth
      };
      this.widgetService.updateWidget(this.widgetId, new_widget).subscribe();
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe();
  }
}

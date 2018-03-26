import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @ViewChild('f') widgetEditForm: NgForm;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: {_id: '', widgetType: '', pageId: '', text: '', size: ''};
  headerText: String;
  headerSize: String;

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

    if (this.widgetId != null) {
      this.widgetService.findWidgetById(this.widgetId)
        .subscribe((widget: any) => {
          this.widget = widget;
          if (this.widget != null) {
            this.headerText = this.widget.text;
            this.headerSize = this.widget.size;
          }
        });
    }
  }

  editWidget() {
    this.headerText = this.widgetEditForm.value.headerText;
    this.headerSize = this.widgetEditForm.value.headerSize;
    if (this.widget == null) {
      const new_widget = {
        widgetType: 'HEADER',
        pageId: this.pageId,
        size: this.headerSize,
        text: this.headerText
      };
      this.widgetService.createWidget(this.pageId, new_widget).subscribe();
    } else {
      const new_widget = {
        widgetType: 'HEADER',
        pageId: this.pageId,
        size: this.headerSize,
        text: this.headerText
      };
      this.widgetService.updateWidget(this.widgetId, new_widget).subscribe();
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe();
  }
}

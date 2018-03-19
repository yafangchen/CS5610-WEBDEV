import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Widget} from '../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';


@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

  @ViewChild('f') widgetEditForm: NgForm;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget;
  textText: String;
  textRows: number;
  textPlaceholder: String;
  textFormatted: boolean;

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
          this.textText = this.widget.text;
          this.textRows = this.widget.rows;
          this.textPlaceholder = this.widget.placeholder;
          this.textFormatted = this.widget.formatted;
        }
      });
  }

  editWidget() {
    this.textText = this.widgetEditForm.value.textText;
    this.textRows = this.widgetEditForm.value.textRows;
    this.textPlaceholder = this.widgetEditForm.value.textPlaceholder;
    this.textFormatted = this.widgetEditForm.controls['textFormatted'].value;
    console.log(this.textFormatted);
    if (this.widget == null) {
      const new_widget = {
        _id: (new Date()).getTime() + '',
        widgetType: 'TEXT',
        pageId: this.pageId,
        text: this.textText,
        rows: this.textRows,
        placeholder: this.textPlaceholder,
        formatted: this.textFormatted
      };
      this.widgetService.createWidget(this.pageId, new_widget).subscribe();
    } else {
      const new_widget = {
        _id: this.widgetId,
        widgetType: 'TEXT',
        pageId: this.pageId,
        text: this.textText,
        rows: this.textRows,
        placeholder: this.textPlaceholder,
        formatted: this.textFormatted
      };
      console.log(new_widget)
      this.widgetService.updateWidget(this.widgetId, new_widget).subscribe();
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe();
  }

}

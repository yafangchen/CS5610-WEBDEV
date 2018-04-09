import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { QuillEditorModule } from 'ngx-quill-editor';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteEditComponent } from './components/website/website-edit/website-edit.component';
import { PageListComponent } from './components/page/page-list/page-list.component';
import { PageNewComponent } from './components/page/page-new/page-new.component';
import { PageEditComponent } from './components/page/page-edit/page-edit.component';
import { WidgetHeaderComponent } from './components/widget-types/widget-header/widget-header.component';
import { WidgetImageComponent } from './components/widget-types/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './components/widget-types/widget-youtube/widget-youtube.component';
import { WidgetListComponent } from './components/widget/widget-list/widget-list.component';
import { WidgetChooserComponent } from './components/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './components/widget/widget-edit/widget-edit.component';

import { UserService } from './services/user.service.client';
import { WebsiteService } from './services/website.service.client';
import { PageService } from './services/page.service.client';
import { WidgetService } from './services/widget.service.client';
import { WbdvSortableDirective } from './wbdv-sortable.directive';
import { WidgetHtmlComponent } from './components/widget-types/widget-html/widget-html.component';
import { WidgetTextComponent } from './components/widget-types/widget-text/widget-text.component';
import { FlickrImageSearchComponent } from './components/widget-types/widget-image/flickr-image-search/flickr-image-search.component';
import {FlickrService} from './services/flickr.service.client';
import {SharedService} from './services/shared.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    WebsiteListComponent,
    RegisterComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    PageListComponent,
    PageNewComponent,
    PageEditComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    WidgetListComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WbdvSortableDirective,
    WidgetHtmlComponent,
    WidgetTextComponent,
    FlickrImageSearchComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpClientModule,
    QuillEditorModule
  ],
  providers: [UserService, WebsiteService, PageService, WidgetService, FlickrService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

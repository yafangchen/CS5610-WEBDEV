import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {FlickrService} from '../../../../services/flickr.service.client';


@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  searchText: String;
  photos: [any];
  error: String;

  constructor(private flickrService: FlickrService, private widgetService: WidgetService, private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];
      }
    );
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          data = data.replace('jsonFlickrApi(', '');
          data = data.substring(0, data.length - 1);
          data = JSON.parse(data);
          console.log(data);
          this.photos = data.photos;
        }
      );

  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    const widget = {
      websiteId: this.websiteId,
      pageId: this.pageId,
      url: url
    };
    this.widgetService
      .updateWidget(this.widgetId, widget)
      .subscribe(
        (data: any) => {
          const result = data;
          if (result) {
            this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' +
            this.pageId + '/widget/' + this.widgetId] );
          } else {
            this.error = 'failed!';
          }
        }
      );
  }
}

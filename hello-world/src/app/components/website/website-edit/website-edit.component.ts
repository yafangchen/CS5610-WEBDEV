import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  @ViewChild('f') websiteEditForm: NgForm;
  userId: String;
  websiteId: String;
  websites: Website[] = [];
  website: Website;
  webname: String;
  webdescription: String;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
      }
    );

    this.websites = this.websiteService.findWebsitesByUser2(this.userId);
    this.website = this.websiteService.findWebsitesById(this.websiteId);
    this.webname = this.website.name;
    this.webdescription = this.website.description;
  }

  editWebsite() {
    this.webname = this.websiteEditForm.value.webname;
    this.webdescription = this.websiteEditForm.value.webdescription;
    const new_website = {
      _id: this.websiteId,
      name: this.webname,
      description: this.webdescription,
      developId: this.userId
    };
    this.websiteService.updateWebsite(this.websiteId, new_website);
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId);
  }

}

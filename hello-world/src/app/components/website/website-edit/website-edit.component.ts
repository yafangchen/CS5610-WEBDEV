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

    this.websiteService.findWebsitesByUser(this.userId)
      .subscribe((websites: Website[]) => {
        this.websites = websites;
      });
    this.websiteService.findWebsiteById(this.websiteId)
      .subscribe((website: Website) => {
        this.website = website;
      });
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
    this.websiteService.updateWebsite(this.websiteId, new_website).subscribe();
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId).subscribe();
  }

}

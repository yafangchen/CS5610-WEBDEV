import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
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
  websites: [{}];
  website = {
    name: '',
    description : '',
    developerId: {},
    dateCreated: {},
    pages: [],
    __v: 0};
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
      .subscribe((websites: any) => {
        this.websites = websites;
      });
    this.websiteService.findWebsiteById(this.websiteId)
      .subscribe((website: any) => {
        this.website = website;
      });
    this.webname = this.website.name;
    this.webdescription = this.website.description;
  }

  editWebsite() {
    this.webname = this.websiteEditForm.value.webname;
    this.webdescription = this.websiteEditForm.value.webdescription;
    const new_website = {
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

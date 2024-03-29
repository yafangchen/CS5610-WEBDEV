import {Component, OnInit, ViewChild} from '@angular/core';
import { WebsiteService } from '../../../services/website.service.client';
import { ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') websiteNewForm: NgForm;
  userId: String;
  websites: {};
  webname: String;
  webdescription: String;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );

    this.websiteService.findWebsitesByUser(this.userId)
      .subscribe((websites: any) => {
        this.websites = websites;
      });
  }

  addWebsite() {
    this.webname = this.websiteNewForm.value.webname;
    this.webdescription = this.websiteNewForm.value.webdescription;
    const new_website = {
      name: this.webname,
      description: this.webdescription,
      developId: this.userId
    };
    this.websiteService.createWebsite(this.userId, new_website).subscribe();
  }

}

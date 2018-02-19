import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  @ViewChild('f') pageEditForm: NgForm;
  userId: String;
  websiteId: String;
  pageId: String;
  page: Page;
  pagename: String;
  pagetitle: String;

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
      }
    );

    this.page = this.pageService.findPageById(this.pageId);
    this.pagename = this.page.name;
    this.pagetitle = this.page.title;
  }

  editPage() {
    this.pagename = this.pageEditForm.value.pagename;
    this.pagetitle = this.pageEditForm.value.pagetitle;
    const new_page = {
      _id: this.pageId,
      name: this.pagename,
      websiteId: this.websiteId,
      title: this.pagetitle
    };
    this.pageService.updatePage(this.pageId, new_page);
  }

  deletePage() {
    this.pageService.deletePage(this.pageId);
  }

}

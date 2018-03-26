import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';
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
  page = {name: '', title: ''};
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

    this.pageService.findPageById(this.pageId)
      .subscribe((page: any) => {
        this.page = page;
      });
    this.pagename = this.page.name;
    this.pagetitle = this.page.title;
  }

  editPage() {
    this.pagename = this.pageEditForm.value.pagename;
    this.pagetitle = this.pageEditForm.value.pagetitle;
    const new_page = {
      name: this.pagename,
      websiteId: this.websiteId,
      title: this.pagetitle
    };
    this.pageService.updatePage(this.pageId, new_page).subscribe();
  }

  deletePage() {
    this.pageService.deletePage(this.pageId).subscribe();
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  @ViewChild('f') pageNewForm: NgForm;
  userId: String;
  websiteId: String;
  pageId: String;
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
  }

  addPage() {
    this.pagename = this.pageNewForm.value.pagename;
    this.pagetitle = this.pageNewForm.value.pagetitle;
    const new_page = {
      name: this.pagename,
      websiteId: this.websiteId,
      title: this.pagetitle
    };
    this.pageService.createPage(this.websiteId, new_page).subscribe();
  }

}

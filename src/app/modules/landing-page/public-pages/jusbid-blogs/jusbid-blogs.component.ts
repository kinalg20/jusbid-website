import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../modules/core/services/common.service';
import { SEOService } from '../../../../modules/core/services/seo.service';

@Component({
  selector: 'app-jusbid-blogs',
  templateUrl: './jusbid-blogs.component.html',
  styleUrls: ['./jusbid-blogs.component.scss']
})
export class JusbidBlogsComponent implements OnInit {

  isShow_SingleBlog: boolean = false;

  blogPost: any;
  constructor(public sco_api: SEOService,
    public common :CommonService) {
    this.getPost();
  }

  ngOnInit(): void {

  }
  getPost() {
    this.common.is_app_loading = true;
    this.sco_api.getSeoData().subscribe(res => {
      this.common.is_app_loading = false;
      this.blogPost = res;
      console.log("blog_data", this.blogPost);
    });
  }
  sortDesc(text: any, len: number) {
    let moreSign: string = '...';
    if (text.length > len) {
      return text.slice(0, len) + '...';
    } else {
      return text.slice(0, text.length);
    }
  }

  iframeLink: string = ''
  show_SingleBlog(link: string) {
    this.common.is_app_loading = true;
    this.isShow_SingleBlog=!this.isShow_SingleBlog;
    this.iframeLink = link;
    this.common.is_app_loading = false;
  }
}

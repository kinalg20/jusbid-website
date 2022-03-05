import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/modules/core/services/common.service';
import { SEOService } from 'src/app/modules/core/services/seo.service';

@Component({
  selector: 'app-jusbid-single-blog',
  templateUrl: './jusbid-single-blog.component.html',
  styleUrls: ['./jusbid-single-blog.component.scss']
})
export class JusbidSingleBlogComponent implements OnInit {
  SingleblogPost: any;
  slug: any;
  city: any;
  url = "https://vaaidehidevelopers.com/jusbid_blogs/wp-json/wp/v2/posts/${id}";

  @Input() link:any;


  constructor(public sco_api: SEOService,
    private route: ActivatedRoute,
    public common : CommonService ) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log("Params:", this.slug)
    this.city = this.route.snapshot.paramMap.get('city');
    console.log("Params:", this.city)

    console.log("Ifrmae link", this.link)
  }

  getSinglePOstURL() {
    return `https://vaaidehidevelopers.com/jusbid_blogs/${this.city}/${this.slug}`;
  }

  // getSinglePost() {
  //   this.sco_api.getSinglePost(this.id).subscribe(res => {
  //     this.SingleblogPost = res;
  //     console.log("blog_data", this.SingleblogPost);
  //   });
  // }

}

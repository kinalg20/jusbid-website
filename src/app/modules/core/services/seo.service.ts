import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SEOService {
    public sco_url = environment.Seo_Url_Blogs;
   
    constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private dom: any, public http: HttpClient) { }

    // Page Title
    updateTitle(title: string) {
        this.title.setTitle(title);
    }
    // Page Description
    updateDescription(desc: string) {
        this.meta.updateTag({ name: 'description', content: desc })
    }

    // OgTags
    updateOgUrl(url: string) {
        this.meta.updateTag({ name: 'og:url', content: url })
    }
    updateOgImage(url: string) {
        this.meta.updateTag({ name: 'og:image', content: url })
    }
    updateOgTitle(title: string) {
        this.meta.updateTag({ name: 'og:title', content: title })
    }
    updateOgDescription(desc: string) {
        this.meta.updateTag({ name: 'og:description', content: desc })
    }
    updateOgLocale(lang: string) {
        this.meta.updateTag({ name: 'og:locale', content: lang })
    }
    updateOgType(type: string) {
        this.meta.updateTag({ name: 'og:type', content: type })
    }
    updateOgSiteName(type: string) {
        this.meta.updateTag({ name: 'og:site_name', content: type })
    }

    // Canonical Tags
    updateCanonicalUrl(url: string) {
        const head = this.dom.getElementsByTagName('head')[0];
        var element: HTMLLinkElement = this.dom.querySelector(`link[rel='canonical']`) || null
        if (element == null) {
            element = this.dom.createElement('link') as HTMLLinkElement;
            head.appendChild(element);
        }
        element.setAttribute('rel', 'canonical')
        element.setAttribute('href', url)
    }
    getSeoData(){
        let url = "https://vaaidehidevelopers.com/jusbid_blogs/wp-json/wp/v2/posts";
        return this.http.get(url);
      }
      getSinglePost(id:any){
        let url = `https://vaaidehidevelopers.com/jusbid_blogs/wp-json/wp/v2/posts/${id}`;
        return this.http.get(url);
      }

      getFilePath(url: string) {
        return this.sco_url + url;
      }
}
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SEOService {

    constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private dom: any) { }

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

}
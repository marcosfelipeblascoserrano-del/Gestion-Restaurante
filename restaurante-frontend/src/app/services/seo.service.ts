import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SeoService {

    constructor(
        private title: Title,
        private meta: Meta,
        @Inject(DOCUMENT) private doc: Document,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    updateTitle(title: string) {
        this.title.setTitle(title);
    }

    updateMeta(description: string, ogTitle?: string, ogImage?: string) {
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ name: 'twitter:description', content: description });

        if (ogTitle) {
            this.meta.updateTag({ property: 'og:title', content: ogTitle });
            this.meta.updateTag({ name: 'twitter:title', content: ogTitle });
        }

        if (ogImage) {
            this.meta.updateTag({ property: 'og:image', content: ogImage });
            this.meta.updateTag({ name: 'twitter:image', content: ogImage });
        }
    }

    setStructuredData(jsonLd: any) {
        if (isPlatformBrowser(this.platformId)) {
            const existingScript = this.doc.getElementById('structured-data');
            if (existingScript) {
                existingScript.remove();
            }

            const script = this.doc.createElement('script');
            script.type = 'application/ld+json';
            script.id = 'structured-data';
            script.text = JSON.stringify(jsonLd);
            this.doc.head.appendChild(script);
        }
    }
}

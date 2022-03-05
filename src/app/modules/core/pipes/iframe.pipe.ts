import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'iframe'
})
export class IframePipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ){}

  transform(id :any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(id);
  }

}
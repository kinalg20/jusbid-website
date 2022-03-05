import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'FAQ';
  showli = false;
  content: any
  number: any;
  activeIndex: number = -1;

  hidden(index: number) {
    this.showli = !this.showli;
    this.activeIndex = index;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-bids-page',
  templateUrl: './recent-bids-page.component.html',
  styleUrls: ['./recent-bids-page.component.scss']
})
export class RecentBidsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showBidFilter: boolean = false;
  bidFilterDropdown() {
    this.showBidFilter = !this.showBidFilter;
  }
  responsiveFilter: boolean = false;
  showFilterSearch() {
    this.responsiveFilter = !this.responsiveFilter;
  }
}

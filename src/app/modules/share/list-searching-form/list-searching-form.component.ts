import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'list-searching-form',
  templateUrl: './list-searching-form.component.html',
  styleUrls: ['./list-searching-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListSearchingFormComponent implements OnInit {
  hometitle = [
    {
      title: "Book Your Accomodation",
      text: "On Price You Desire"
    },
    {
      title: "Reserve a Hotel room",
      text: "At Most Affordable Price Ever"
    },
    {
      title: "Pay Less Get More",
      text: "With Unique Hotel Bid System"
    }
  ];

  recent_search: any = {};

  constructor(private router: Router, public _common:CommonService) { }

  ngOnInit(): void {
    interval(3500).subscribe(_val => this.shuffleTitle());

    let recentSearchData = localStorage.getItem("recent_booking")
    if (recentSearchData != null) {
      this.recent_search = JSON.parse(recentSearchData);
    }

  }

  shuffleTitle() {
    let counter = this.hometitle.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      [this.hometitle[counter], this.hometitle[index]] = [this.hometitle[index], this.hometitle[counter]];
    }
  }


  searchHotelByRecentData() {
    let searchData = {
      city: this.recent_search.city,
      rooms: this.recent_search.rooms,
      guestNo: this.recent_search.guest_no,
      arrival: this.recent_search.arrival,
      departure: this.recent_search.departure,
      lat: this.recent_search.lat ? this.recent_search.lat : '',
      long: this.recent_search.long ? this.recent_search.long : '',
    }
    this.router.navigate(['/hotels-search'], { queryParams: searchData });
  }

  activeTab:string='Hotel';
  getActiveTab(tabIndex:string){
    this.activeTab = tabIndex;
  }


}

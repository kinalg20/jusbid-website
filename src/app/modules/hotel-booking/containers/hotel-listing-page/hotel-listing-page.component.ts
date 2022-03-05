import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { debounceTime, distinctUntilChanged, filter, map, pluck, toArray } from 'rxjs/operators';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { from } from 'rxjs';
import { SortPipe } from 'src/app/modules/core/pipes/sort.pipe';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/modules/core/services/common.service';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-hotel-listing-page',
  templateUrl: './hotel-listing-page.component.html',
  styleUrls: ['./hotel-listing-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HotelListingPageComponent implements OnInit {

  searchQuery: any;
  @Input() hoteldata: any;
  allAmenitiesList: any = [];
  allHotelData: any = [];
  hotelId: string = '';
  showFiterModel: boolean = false;
  fixed_header: boolean = false;
  amenitiesList: any = [];
  selectedAmenities: any = [];
  categoryList: any = [];
  showAllAmenities: boolean = false;
  showAllCategory: boolean = false;
  showAllAmenitiesText: string = 'See More';
  showAllCategoryText: string = 'See More';
  city: string = '';
  i: number = 0;
  amenitySelectForFilter: boolean = false;
  myarr: any = [];
  categorySelectForFilter: boolean = false;
  mycategoryarr: any = [];
  sortPrice: string = '';
  sortRate: string = '';
  filtershow: boolean = true;
  search_q: any
  rate: number = 3.2;
  max: number = 5;
  Hotel_rating: number = 3;
  HotelList: any = [];
  searchhotellist: any = [];
  toplimit: any = 4;


  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private apiRequest: ApiService,
    private _apiRequest: ApiRequestService,
    public router: Router,
    private sortPipe: SortPipe,
    public _common: CommonService
  ) { }

  apiBaseURL: string = "";


  value: any;
  highValue: any;
  options: Options = {};
  minValue: number = 0;
  maxValue: number = 100;
  rating_array = [
    { id: 1, rating: "5 Star" },
    { id: 2, rating: "4 Star" },
    { id: 3, rating: "3 Star" }
  ]

  ngOnInit(): void {
    this.options = {
      floor: 0,
      ceil: 100,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return "";
          case LabelType.High:
            return "";
          default:
            return "";
        }
      }
    }
    this.route.queryParams.subscribe(param => {
      this.search_q = param;
    })
    // console.log("this.search_q", this.search_q.city)


    this.apiBaseURL = this.apiRequest.serviceurl
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params;
      if (this.searchQuery.is_searchBy_HotelName && !this.searchQuery.sbpc) {
        this.getSerachHotelsName(this.searchQuery);
      }
      if (this.searchQuery.sbpc) {
        this.getSerachHotelsByPopularCities(this.searchQuery);
      } else {
        this.getSerachHotels(this.searchQuery);
      }
      // special case for Goa.
      if (this.searchQuery.city === 'Goa') {
        this.smallData = [];
        const cities = {
          Mapusa: {
            lat: 15.5937116,
            long: 73.8142237,
          },
          Margao: {
            lat: 15.2832187,
            long: 73.98619099999999,
          },
          Marmagao: {
            lat: 15.3889087,
            long: 73.81656679999999,
          },
          Panaji: {
            lat: 15.4909301,
            long: 73.8278496,
          }
        }

        // cloning this.searchQuery
        const requestBody = JSON.parse(JSON.stringify(this.searchQuery));

        for (let [city, coordinate] of Object.entries(cities)) {
          requestBody.city = city;
          requestBody.lat = coordinate.lat;
          requestBody.long = coordinate.long;
          // searching hotels for every city and its lat, long.
          this.getSerachHotels(requestBody);
        }
      }
    });
    // console.log("hotelname", this.searchQuery),
    this.getCategory();
    this.getAllAmenities();
    this.getHotelAmenitites();
  }


  showAllHotelList() {
    this.priceSelection = 0;
    setTimeout(() => {
      this.getSerachHotels(this.searchQuery);
      this.getSerachHotelsByPopularCities(this.searchQuery)
      this.getSerachHotelsName(this.searchQuery);
    }, 2000)
    this.searchTerm = '';
  }

  getAllAmenities() {
    this._apiRequest.getAllAmenities().subscribe(
      res => {
        this.allAmenitiesList = res.data;
      }
    )
  }

  gethotelrating(rating: any) {
    return JSON.parse(rating);
  }


  resultNotFound: boolean = false;
  myHotelAmenity: any = [];
  shimmerLoad: boolean = true;
  items = [];

  startPriceRangeValue: number = 0;
  endPriceRangeValue: number = 0;
  getSerachHotels(searchData: any) {
    let apiURL = "/home-search-new";
    this.allHotelData = [];
    this.shimmerLoad = true;
    this.apiRequest.post(apiURL, searchData).pipe(
      pluck('data'),
      map(items => items),
    ).subscribe(
      res => {
        let display_hotels: any = [];
        from(res).pipe(
          map((hotel: any) => {

            // console.log(Math.floor(hotel.rating) || Math.ceil(hotel.rating));
            let hotelObj: any = {
              hotel_rating2: hotel.rating != "" ? parseInt(hotel.rating) : 0,
              ...hotel,
            }
            // console.log("rating", hotel.rating != "" ? hotel.rating : 0)
            return hotelObj
          }),
          toArray()
        ).subscribe(
          res => {
            // console.log("rxjsarray", res)
            display_hotels = res;

            display_hotels.forEach((hotel: any) => {
              const newData: any = []

              if (Array.isArray(hotel.hotel_amenities)) {
                hotel.hotel_amenities.forEach((id: string) => {
                  this.allAmenitiesList.forEach((amenitiesdata: any) => {
                    if (amenitiesdata.id.includes(id)) {
                      newData.push(amenitiesdata);
                    }
                  });
                });
                this.allHotelData.push({ amenityObj: newData, ...hotel });
              }

            });
            this.allHotelData = this.sortPipe.transform(this.allHotelData, "asc", "room_price");
            this.copy_allHotelData = this.allHotelData;
            // console.log('hotel Amenities-3', this.allHotelData)
            this.startPriceRangeValue = this.allHotelData[0]?.room_price;
            this.endPriceRangeValue = this.allHotelData.slice(-1)[0]?.room_price;

            if (this.allHotelData.length === 0) {
              this.resultNotFound = true;
            } else {
              this.resultNotFound = false;
            }

            this.value = this.options.floor = this.minValue = this.startPriceRangeValue ? this.startPriceRangeValue : 0;
            this.highValue = this.options.ceil = this.maxValue = this.endPriceRangeValue ? this.endPriceRangeValue : 5000;

            // special case for Goa
            if (this.searchQuery.city === 'Goa') {
              // removing duplicates from this.allHotelData
              this.allHotelData = Array.from(new Set(this.allHotelData.map((v: any) => v.id))).map(id => this.allHotelData.find((v: any) => v.id === id));
            }

            this.smallData = this.allHotelData;
            this.HotelList=this.smallData;
            // this.smallData = this.sortPipe.transform(this.smallData, "desc", "room_price");
            // this.HotelList = this.smallData.slice(0, 4)
            // this.List = this.smallData.slice(0, 4)
            this.shimmerLoad = false;
            console.log(this.HotelList);

          }
        )
        // console.log("hotel", res)

      }, err => {
        this.shimmerLoad = false;
        // console.log(err)
      }
    );
  }



  getSerachHotelsName(searchData: any) {
    let apiURL = "/search-by-hotelname";
    this.allHotelData = [];
    this.shimmerLoad = true;
    this.apiRequest.post(apiURL, searchData).pipe(
      pluck('data'),
      map(items => items),
    ).subscribe(
      res => {
        let display_hotels: any = [];
        from(res).pipe(
          map((hotel: any) => {
            let hotelObj: any = {
              hotel_rating2: hotel.rating != "" ? parseInt(hotel.rating) : 0,
              ...hotel,
            }
            return hotelObj
          }),
          toArray()
        ).subscribe(
          res => {
            display_hotels = res;
            display_hotels.forEach((hotel: any) => {
              const newData: any = []

              if (Array.isArray(hotel.hotel_amenities)) {
                hotel.hotel_amenities.forEach((id: string) => {
                  this.allAmenitiesList.forEach((amenitiesdata: any) => {
                    if (amenitiesdata.id.includes(id)) {
                      newData.push(amenitiesdata);
                    }
                  });
                });
                this.allHotelData.push({ amenityObj: newData, ...hotel });
              }

            });
            this.allHotelData = this.sortPipe.transform(this.allHotelData, "asc", "room_price");
            this.copy_allHotelData = this.allHotelData;
            // console.log('hotel Amenities-3', this.allHotelData)
            this.startPriceRangeValue = this.allHotelData[0]?.room_price;
            this.endPriceRangeValue = this.allHotelData.slice(-1)[0]?.room_price;

            if (this.allHotelData.length === 0) {
              this.resultNotFound = true;
            } else {
              this.resultNotFound = false;
            }

            this.value = this.options.floor = this.minValue = this.startPriceRangeValue ? this.startPriceRangeValue : 0;
            this.highValue = this.options.ceil = this.maxValue = this.endPriceRangeValue ? this.endPriceRangeValue : 5000;

            this.smallData = this.allHotelData;
            this.HotelList=this.smallData;

            this.shimmerLoad = false;

          }
        )

      }, err => {
        this.shimmerLoad = false;
        // console.log(err)
      }
    );
  }

  getSerachHotelsByPopularCities(searchData: any) {
    let apiURL = "/home-search";
    this.allHotelData = [];
    this.shimmerLoad = true;
    this.apiRequest.post(apiURL, searchData).pipe(
      pluck('data'),
      map(items => items),
    ).subscribe(
      res => {
        let display_hotels: any = [];
        from(res).pipe(
          map((hotel: any) => {
            let hotelObj: any = {
              hotel_rating2: hotel.rating != "" ? parseInt(hotel.rating) : 0,
              ...hotel,
            }
            // console.log("rating", hotel.rating != "" ? hotel.rating : 0)
            return hotelObj
          }),
          toArray()
        ).subscribe(
          res => {
            // console.log("rxjsarray", res)
            display_hotels = res;
            display_hotels.forEach((hotel: any) => {
              const newData: any = []
              if (Array.isArray(hotel.hotel_amenities)) {
                hotel.hotel_amenities.forEach((id: string) => {
                  this.allAmenitiesList.forEach((amenitiesdata: any) => {
                    if (amenitiesdata.id.includes(id)) {
                      newData.push(amenitiesdata);
                    }
                  });
                });
                this.allHotelData.push({ amenityObj: newData, ...hotel });
              }
            });
            this.allHotelData = this.sortPipe.transform(this.allHotelData, "asc", "room_price");
            this.copy_allHotelData = this.allHotelData;
            // console.log('hotel Amenities-3', this.allHotelData)
            this.startPriceRangeValue = this.allHotelData[0]?.room_price;
            this.endPriceRangeValue = this.allHotelData.slice(-1)[0]?.room_price;

            if (this.allHotelData.length === 0) {
              this.resultNotFound = true;
            } else {
              this.resultNotFound = false;
            }

            this.value = this.options.floor = this.minValue = this.startPriceRangeValue ? this.startPriceRangeValue : 0;
            this.highValue = this.options.ceil = this.maxValue = this.endPriceRangeValue ? this.endPriceRangeValue : 5000;

             this.smallData = this.allHotelData;
            this.HotelList=this.smallData;
            // this.smallData = this.sortPipe.transform(this.smallData, "desc", "room_price");
            // this.HotelList = this.smallData.slice(0, 4)
            // this.List = this.smallData.slice(0, 4)
            this.shimmerLoad = false;

          }
        )

      }, err => {
        this.shimmerLoad = false;
        // console.log(err)
      }
    );
  }

  copy_allHotelData: any = [];
  price_Selection: any = 0;
  slider_Event() {
    // console.log("priceSelection", this.price_Selection);
    this.filterHoteldata(this.selected_amenity_list_for_filter, this.mycategoryarr, this.price_Selection[0], this.price_Selection[1], '');
    // this.allHotelData = this.copy_allHotelData.filter((hotel: any) => hotel.room_price >= this.price_Selection[0] && hotel.room_price <= this.price_Selection[1]);
  }


  searchKey: string = '';
  smallData: any = [];

  onChangePage(pageOfItems: any) {
    // update current page of items
    this.shimmerLoad = true;
    this.smallData = pageOfItems;
    if (Array.isArray(this.smallData)) {
      this.shimmerLoad = false;
    }
  }

  resetFilter() {
    this.getSerachHotels(this.searchQuery);
    this.priceSelection = 0;
    this.myarr = this.mycategoryarr = [];
  }

  categoryShimmerLoad: boolean = true;
  getCategory() {
    let categoryUrl = `/get-hotel-categories`;
    this.apiRequest.get(categoryUrl).subscribe(
      res => {
        if (res.responseCode == 200) {
          this.categoryShimmerLoad = false;
          this.categoryList = res.data
          // res.data.forEach((value:any) => {
          //   this.categoryList.push(
          //     {
          //       checked: false,
          //       ...value
          //     }
          //   )
          // });
          // console.log("Category list", this.categoryList);
        } else {
          // console.log(res)
        }
      }, err => {
        // console.log(err)
      }
    );
  }

  amenitiesShimmerLoad: boolean = true;
  getHotelAmenitites() {
    let apiURL = "/get-amenities";
    this.apiRequest.get(apiURL).subscribe(
      res => {
        if (res.responseCode == 200) {
          this.amenitiesShimmerLoad = false;
          this.amenitiesList = res.data
          // res.data.forEach((value:any) => {
          //   this.amenitiesList.push(
          //     {
          //       checked: false,
          //       ...value
          //     }
          //   )
          // });
          // console.log("amenities list", this.amenitiesList);
        } else {
          // console.log(res)
        }
      }, err => {
        // console.log(err)
      }
    );
  }

  seeMore() {
    this.showAllAmenities = !this.showAllAmenities;
    if (this.showAllAmenities) {
      this.showAllAmenitiesText = "Show Less";
    } else {
      this.showAllAmenitiesText = "Show More";
    }
  }

  getPrice(event: any) {
    this.sortPrice = event.target.value;
    // console.log("price", this.sortPrice);
    if (this.sortPrice) {
      this.filterHoteldata(this.selected_amenity_list_for_filter, this.mycategoryarr, this.priceSelection[0], this.priceSelection[1], this.sortPrice);
    } else {
      this.filterHoteldata(this.selected_amenity_list_for_filter, this.mycategoryarr, this.priceSelection[0], this.priceSelection[1], '');
    }
  }
  getRating(event: any) {
    this.sortRate = event.target.value;
    // console.log("price", this.sortRate);
    if (this.sortRate) {
      this.filterHoteldata(this.selected_amenity_list_for_filter, this.mycategoryarr, this.priceSelection[0], this.priceSelection[1], this.sortPrice, this.sortRate);
    }
    else if (!this.sortRate) {
      this.filterHoteldata(this.selected_amenity_list_for_filter, this.mycategoryarr, this.priceSelection[0], this.priceSelection[1], this.sortPrice, '');

    }

  }
  getFilterAmenity(event: any) {
    this.amenitySelectForFilter = !this.amenitySelectForFilter;
    if (this.myarr.includes(event.target.value)) {
      const index = this.myarr.indexOf(event.target.value);
      if (index > -1) {
        this.myarr.splice(index, 1);
      }
    } else {
      this.myarr.push(event.target.value);
    }

    if (this.myarr) {
      this.filterHoteldata(this.selected_amenity_list_for_filter, this.mycategoryarr, this.priceSelection[0], this.priceSelection[1], this.sortPrice);
    } else if (!this.myarr) {
      this.filterHoteldata(this.selected_amenity_list_for_filter, this.mycategoryarr, this.priceSelection[0], this.priceSelection[1], this.sortPrice);
    }
  }

  seeCategoryMore() {
    this.showAllCategory = !this.showAllCategory;
    if (this.showAllCategory) {
      this.showAllCategoryText = "Show Less";
    } else {
      this.showAllCategoryText = "Show More";
    }
  }

  getFilterCategory(event: any) {
    // console.log("Category:", event.target.value);
    this.categorySelectForFilter = !this.categorySelectForFilter;
    if (this.mycategoryarr.includes(event.target.value)) {
      const index = this.mycategoryarr.indexOf(event.target.value);
      if (index > -1) {
        this.mycategoryarr.splice(index, 1);
      }
    } else {
      this.mycategoryarr.push(event.target.value);
    }

    if (this.mycategoryarr) {
      this.filterHoteldata(this.selected_amenity_list_for_filter, this.mycategoryarr, this.priceSelection[0], this.priceSelection[1], this.sortPrice);
    } else if (!this.mycategoryarr) {
      this.filterHoteldata(this.selected_amenity_list_for_filter, [], this.priceSelection[0], this.priceSelection[1], this.sortPrice);
    }

  }

  selected_amenity_list: any = [];
  selected_amenity_list_for_filter: any = [];
  getSelectedAmenitiesList(amenity: any) {
    if (!this.selected_amenity_list.includes(amenity) && !this.selected_amenity_list_for_filter.includes(amenity)) {
      this.selected_amenity_list.push(amenity)
      this.selected_amenity_list_for_filter.push(amenity.id)
    }
    else {
      var index = this.selected_amenity_list.indexOf(amenity);
      var index2 = this.selected_amenity_list_for_filter.indexOf(amenity.id);
      if (index > -1 && index2 > -1) {
        this.selected_amenity_list.splice(index, 1);
        this.selected_amenity_list_for_filter.splice(index2, 1);
      }
    }
    // console.log("selected_amenity_list", this.selected_amenity_list_for_filter)
    this.filterHoteldata(this.selected_amenity_list_for_filter, this.selected_category_list, this.priceSelection[0], this.priceSelection[1], this.sortPrice);
  }
  selected_category_list: any = [];
  getSelectedCategory(category: string) {
    if (!this.selected_category_list.includes(category)) {
      this.selected_category_list.push(category)
    } else {
      var index = this.selected_category_list.indexOf(category);
      if (index > -1) {
        this.selected_category_list.splice(index, 1);
      }
    }
    this.filterHoteldata(this.selected_amenity_list_for_filter, this.selected_category_list, this.priceSelection[0], this.priceSelection[1], this.sortPrice);
  }


  // Fetch Listing Data As Per search 
  viewDetails(hotelId: string) {
    hotelId = hotelId;
    localStorage.setItem("Hotel_ID", hotelId);
    this.router.navigate(['/details']);
  }
  // End Fetch data function Ts

  // Show Filter Modal in responsive
  show_filter: boolean = false;
  showFilter(show: number) {
    if (show == 0) {
      this.show_filter = true;
    }
    else if (show == 1) {
      this.show_filter = false;
    }
  }
  // End Show Filter Modal Ts

  // For Show Add Room Box
  show_room: boolean = false;
  showAddRoom() {
    this.show_room = !this.show_room;
  }
  active: boolean = false;
  activeNumber: number = 0;
  changeStyle($event: any, i: number) {
    this.active = $event.type == 'mouseover' ? true : false;
    this.activeNumber = i;
  }
  priceSelection: any = 0;
  sliderEvent() {
    // console.log("priceSelection", this.priceSelection)
    if (this.priceSelection) {
      this.filterHoteldata(this.selected_amenity_list_for_filter, this.mycategoryarr, this.priceSelection[0], this.priceSelection[1], this.sortPrice);

    }
    else if (!this.priceSelection) {
      this.filterHoteldata(this.selected_amenity_list_for_filter, this.mycategoryarr, 0, 0, this.sortPrice);
    }
  }
  filterHoteldata(amenities?: any, category?: any, min?: number, max?: number, price?: string, rating?: string) {
    this.allHotelData = [];
    let filterUrl = `/filter-hotels`;
    let obj = {
      city: this.searchQuery.city,
      rangeMax: JSON.stringify(max),
      rangeMin: JSON.stringify(min),
      selectedAmenity: amenities.length > 0 ? amenities : [],
      selectedCategory: category.length > 0 ? category : [],
      sortBy: price
    }
    // console.log("Filter range", obj);
    this.shimmerLoad = true;
    this.apiRequest.post(filterUrl, obj).subscribe(
      res => {

        let filteredHotelsList = res.responseCode === 200 ? res.data : [];

        let filteredData: any = [];

        filteredHotelsList.forEach((hotel: any) => {
          if (hotel.room_price != null && hotel.status == 'Approved') {
            let hotelAmenityList: any = [];
            if (Array.isArray(hotel.hotel_amenities)) {
              hotel.hotel_amenities.forEach((amenity_id: string) => {
                this.allAmenitiesList.forEach((amenity: any) => {
                  if (amenity.id === amenity_id) {
                    hotelAmenityList.push(amenity);
                    this.shimmerLoad = false;
                  }
                });
              });
            }
            filteredData.push({ amenityObj: hotelAmenityList, ...hotel });
          }
        });
        this.allHotelData = filteredData;
        this.smallData = filteredData;
        this.smallData = filteredData;
        this.HotelList=this.smallData;
        // console.log("Filtered Data Res", this.smallData)

        let display_hotels = [];
        this.shimmerLoad = false;
      }, err => {
        this.shimmerLoad = false;
        // console.log(err)
      }
    );
  }
  amenitiesIsExist(id: string) {
    this.allHotelData.forEach((value: any) => {
      return value.hotel_amenities.slice(0, 4).includes(id);
    });
  }

  lengthOfDataList: number = 5;
  is_showAll: boolean = false;
  is_showCategoryAll: boolean = false;

  showAll(lenOfData: number) {
    this.is_showAll = !this.is_showAll;
    if (this.is_showAll) {
      this.lengthOfDataList = lenOfData;
    } else {
      this.lengthOfDataList = 5;
    }
  }
  lengthOfCategoryDataList: number = 5;
  showAllCategoryList(lenOfData: number) {
    this.is_showCategoryAll = !this.is_showCategoryAll;
    if (this.is_showCategoryAll) {
      this.lengthOfCategoryDataList = lenOfData;
    } else {
      this.lengthOfCategoryDataList = 5;
    }
  }

  getSelectedAmenities(id: string) {
    this.allAmenitiesList.forEach((data: any) => {
      if (data.id === id) {
        return data;
      }
    });
  }
  onHotelDetails(city: string) {
    this._apiRequest.setHotelBooking(city, this.searchQuery.rooms, this.searchQuery.guestNo, this.searchQuery.arrival, this.searchQuery.departure, this.searchQuery.lat, this.searchQuery.long);
  }

  clearAllFilters() {
    window.location.reload();
  }


  filterBy: string = 'room_price';
  is_ASC: boolean = false;

  sortBy(event: any) {

    let expr = event.target.value;
    switch (expr) {
      case 'price_ASC':
        this.is_ASC = true;
        this.filterBy = 'room_price'
        break;
      case 'price_DESC':
        this.is_ASC = false;
        this.filterBy = 'room_price'
        break;
      default:
    }

  }

  thumbnail_Image: string = 'assets/images/dummy.jpg';
  loaded(status: any, imgUrl: any) {
    this.thumbnail_Image = this.apiBaseURL + imgUrl;
  }
  error(status: any, imgUrl: any) {
    this.thumbnail_Image = this.apiBaseURL + imgUrl;
  }

  onLoadImg(min_image_url: string, org_image_url: string) {
    if (min_image_url || org_image_url) {
      return this.apiBaseURL + min_image_url;
    }
    else {
      return 'assets/images/dummy.jpg';
    }
  }


  onload() {
    return true;
  }
  onError() {
    return true;
  }
  // 

  checkMinImg(minImgURL: string) {

  }

  currentImgIndex: number = 0;
  onMinImageError(index: number) {
  }

  currentImgURL: string = '';
  onErrorMinImage(imgURL: string, index: number) {
    if (imgURL || imgURL != undefined) {
      this.currentImgURL = this.apiBaseURL + imgURL;
      this.currentImgIndex = index;
    } else {
    }
  }

  imgError(image: any) {
    image.onerror = "";
    image.src = "assets/images/dummy.jpg";
    return true;
  }



  go_to_Top() {
    window.scroll(0, 0);
  }

  getGeoLocation(lat: any, lng: any) {
    let fullAddress: string = '';
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(Number(lat), Number(lng));
      let request: any = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          if (result != null) {
            // console.log("Adddres:", result.formatted_address);
            fullAddress = result.formatted_address;
          } else {
            alert("No address available!");
          }
        }
      });
    }
    return fullAddress;
  }

  // getCurrentLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       let customerLatitude = position.coords.latitude;
  //       let customerLongitude = position.coords.longitude;
  //       // console.log("lat long", this.customerLatitude, this.customerLongitude)
  //       // this.getGeoLocation(customerLatitude, customerLongitude);
  //     });
  //   }
  //   else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }
  // Filter() {
  //   console.log("fgfhfghghgh")
  //   this.selectedAmenities = [];
  //   console.log(this.selectedAmenities);
  //   this.getSelectedAmenitiesList(this.selectedAmenities)
  // }



  // //ionic loading
  // @ViewChild(IonInfiniteScroll)
  // infiniteScroll!: IonInfiniteScroll;

  // List: any = [];
  // load: any;
  // //for loading date of Hotel Listing
  // loadData(event: any) {
  //   this.load = event;
  //   setTimeout(() => {
  //     this.toplimit += 4;
  //     this.allHotelData = this.smallData.slice(0, this.toplimit)
  //     this.HotelList = this.allHotelData;
  //     this.List = this.allHotelData;
  //     event.target.complete();

  //     if (this.allHotelData.length == this.smallData.length) {
  //       event.target.disabled = true;

  //     }
  //   }, 100);
  //   if (this.fetchdatacurrentlist) {
  //     event.target.disabled = true;
  //   }
  // }

  // fetchdatacurrentlist: any[] = [];
  // getsearchedhotel(name: any) {
  //   this.List = [];
  //   this.fetchdatacurrentlist = [];
  //   if (name.target.value) {
  //     for (var data of this.HotelList) {
  //       if (data.name.includes(name.target.value)) {
  //         this.fetchdatacurrentlist.push(data);
  //       }
  //       this.List = this.fetchdatacurrentlist;
  //     }
  //   }
  //   else {
  //     this.List = this.HotelList;
  //   }
  //   // console.log(this.List);
  // }

  @ViewChild('searchForm') searchForm: NgForm | any;
  searchTerm: string = "";
  getSearchItem(event: any) {
    this.searchKey = event.target.value;
    if (this.searchKey) {
      this._apiRequest.searchHotel(this.search_q.city, this.searchKey).subscribe(
        res => {
          console.log(this.searchKey);
          console.log("Search results hotels:", res.data);
          this.allHotelData = [];

          from(res.data).pipe(
            map((hotel: any) => {
              let hotelObj: any = {
                hotel_rating2: hotel.rating != "" ? parseInt(hotel.rating) : 0,
                ...hotel,
              }
              return hotelObj
            }),
            toArray()
          ).subscribe(
            res => {
              console.log("rxjsarray", res)

              res.forEach((hotel: any) => {
                const newData: any = []

                if (Array.isArray(hotel.hotel_amenities)) {
                  hotel.hotel_amenities.forEach((id: string) => {
                    this.allAmenitiesList.forEach((amenitiesdata: any) => {
                      if (amenitiesdata.id.includes(id)) {
                        newData.push(amenitiesdata);
                      }
                    });
                  });
                  this.allHotelData.push({ amenityObj: newData, ...hotel });
                }

              });
              this.allHotelData = this.sortPipe.transform(this.allHotelData, "asc", "room_price");
              this.copy_allHotelData = this.allHotelData;
              // console.log('hotel Amenities-3', this.allHotelData)
              this.startPriceRangeValue = this.allHotelData[0]?.room_price;
              this.endPriceRangeValue = this.allHotelData.slice(-1)[0]?.room_price;


              if (this.allHotelData.length === 0) {
                this.resultNotFound = true;
              } else {
                this.resultNotFound = false;
              }

              this.smallData = this.allHotelData;
              this.value = this.options.floor = this.minValue = 0;
              this.highValue = this.options.ceil = this.maxValue = this.endPriceRangeValue;

              // console.log("Min max:", this.value, this.highValue)


              this.shimmerLoad = false;

            }

          )

        }
      );
    }
    else {
      console.log("this.HotelList",this.HotelList)
      //this.smallData=this.HotelList
    //  this.getSerachHotels(this.searchTerm)
      this.showAllHotelList()
    }
  }
  checkedrating: boolean = false;
  ratingNumber: any;
  rating_data_fetch: any[] = [];
  getSelectedrating(rating: any, rating_number: any) {
    if (rating.target.checked) {
      this.ratingNumber = rating_number;
      this.smallData.filter((val: any) => {
        // console.log(val.star_rating)
        if (val.star_rating) {

        }
        var test_val = val.star_rating.includes(this.ratingNumber);
        // console.log(test_val);
      })
      // console.log("star_rating_data***************",this.rating_data_fetch);
    }
  }
}



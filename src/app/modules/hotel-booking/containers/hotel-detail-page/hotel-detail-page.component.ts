import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/modules/core/services/common.service';
import { Gallery, GalleryItem, ImageItem } from '@ngx-gallery/core';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { now } from 'jquery';
import * as moment from 'moment';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { PaymentsService } from 'src/app/modules/core/services/payments.service';
import { Title } from '@angular/platform-browser';
import { SortPipe } from 'src/app/modules/core/pipes/sort.pipe';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-hotel-detail-page',
  templateUrl: './hotel-detail-page.component.html',
  styleUrls: ['./hotel-detail-page.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class HotelDetailPageComponent implements OnInit {

  hotel_id: string = "";
  math = Math;
  room_qty: number = 0;
  totalRooms: any;
  totalAmount: any;
  current_hotel_sys_id: string = "";
  bidPlaced: boolean = false;
  bidRejected: boolean = false;
  hoteldata: any = {};
  hotelamenities: any = [];
  roomamenities: any = [];
  content: any = [];
  counter: number;
  fixed_header: boolean = false;
  showModal: boolean = false;
  currentImg: string = '';
  currentVideo: string = '';
  user_all_data: any = [];
  status: string = "";
  bidMsg: string = "";
  bidResponseCode: number = 0;
  loginStatus: boolean = false;
  model: any;
  minDate = new Date();
  maxDate = new Date();
  checkin_date = new Date();
  checkout_date = new Date();
  returnDate = new Date();
  maxReturnDate = new Date();
  data_for_bidding: any = {};
  roomSelectedForBidding: boolean = false;
  // categoryActive: number = 0;
  selected_room_capacity: number = 0;
  // adult: any;
  showAmenities: boolean = true;
  showRoomAmenities: boolean = true;
  showAmenityText: string = 'Show More';
  showRoomAmenityText: string = 'Show More';
  showAddon: boolean = true;
  showAddonText: string = 'Show More';
  ShowMinRooms: number = 1;
  RoomsQuantity: number = 1;
  ShowRoomQuantityWarning: boolean = false;
  public imageName: string = 'Front';
  hotel_images: any = [];
  hotel_category_images: any = [];
  faqs: any = [];
  items!: GalleryItem[];
  roomitems!: GalleryItem[];
  imageData: any = [];
  roomimageData: any = [];
  recent_bidding: any = [];
  recent_search: any = {};
  roomsQTY: number = 1;
  hotelDescription: number = 0;
  success_msg: string = '';
  error_msg: string = '';
  newVar: any;
  checkinDate: Date = new Date();
  checkoutDate: Date = new Date();
  adultCount: number = 1;
  childCount: number = 0;
  bid_price: any;
  DateDiffDays: number = 1;
  categoryActive: number = 0;
  previous_roomsQTY: number = 0;
  selectedRoomCapacity: number = 0;
  selectedRoomPrice: number = 0;
  additionCommition: number = 0.10;
  cureentSelectedRoomDetails: any = [];
  cureentSelectedRoomViews: any = {};
  cureentSelectedRoomAmenities: any = []
  checkin_date_value = new Date();
  checkout_date_value = new Date();
  recommended_hotels: any = [];
  fixedName: boolean = false;
  constructor(
    public _utilsService: UtilsService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public common_service: CommonService,
    public datePipe: DatePipe,
    public gallery: Gallery,
    private sortPipe: SortPipe,
    private apiRequest: ApiService,
    public _apiRequest: ApiRequestService,
    public payment_service: PaymentsService,
    @Inject(DOCUMENT) private document: Document

  ) {
    this.counter = 0;
    this.check_in_date.setDate(this.today_date.getDate());
    this.check_out_date.setDate(this.today_date.getDate() + 1);

    
    this.minDate.setDate(this.minDate.getDate());
    this.checkoutDate.setDate(this.checkoutDate.getDate() + 1);
    this.returnDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 90);
    this.maxReturnDate.setDate(this.maxDate.getDate() + 91);
    this.getScreenSize();
  }
  apiBaseURL: string = "";
  checkindate: any;
  checkoutdate: any;
  recent_search_key: string = '';
  bsRangeValue: any;
  today_date = new Date();
  check_in_date = new Date();
  check_out_date = new Date();
  ngOnInit(): void {

    var d = new Date(Date.now())
    d.setDate(d.getDate() + 1);
    let recentSearchData = localStorage.getItem("recent_booking")

    if (recentSearchData != null) {
      this.recent_search = JSON.parse(recentSearchData);
      this.recent_search_key = this.recent_search.is_searchBy_HotelName ? this.recent_search.hotel_name : this.recent_search.searchLocation;
      this.bsRangeValue = [this.recent_search.arrival, this.recent_search.departure];
      if (this.recent_search.sbpc || recentSearchData == null) {
        this.bsRangeValue = [this.formatDate(this.check_in_date), this.formatDate(this.check_out_date)];
        this.recent_search_key = this.recent_search.city ? this.recent_search.city : ''
      }
    }
    console.log("data", this.checkindate);
    console.log("out", this.checkoutdate)
    this.getHotelAmenities();
    this.apiBaseURL = this.apiRequest.serviceurl
    this.hotel_id = this.activatedRoute.snapshot.params.id;
    this.user_all_data = this.common_service.getLogedinUserData();
    // console.log(this.user_all_data);
    this.getRecentBidding(this.user_all_data.userId);
    this.current_hotel_sys_id = this.hotel_id;
    this.getHotelDetails(this.hotel_id);
    this.get_hotel_ratings(this.hotel_id);
    this.getHotelAddonsList(this.hotel_id);

    this.getRoomsAmenities();
    let recentSerachData = localStorage.getItem("recent_booking")
    if (recentSerachData != null) {
      this.recent_search = JSON.parse(recentSerachData);
      if (this.recent_search.guestNo && this.recent_search.rooms) {
        this.roomsQTY = this.recent_search.rooms;
        this.adultCount = this.recent_search.guestNo;
      }
    }
  }


  formatDate(date: any) {
    var d = new Date(date);
    return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
  }

  get_rating(rating:any){
    return Math.round(rating);
  }
  
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }



  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.scrWidth >= 1024 || this.scrHeight >= 1024) {
      if (document.body.scrollTop > 800 ||
        document.documentElement.scrollTop > 800) {
        this.fixedName = true
      } else {
        this.fixedName = false
      }
    }
  }
  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    // console.log(this.scrHeight, this.scrWidth);
  }
  selected_room_type: string = '';
  selected_room_price: string = '';
  getRecentBidding(uid: any) {
    this._apiRequest.getMyBidings(uid).subscribe(
      res => {
        res.data.forEach((value: any) => {
          if ((value.status == 'Processing' || (value.status == 'Approved' && value.is_booked == false)) && value.hotel_id == this.hotel_id) {
            this.recent_bidding.push(value);
          }
        });
      });
  }
  label = [
    {
      name: 'Front'
    },
    {
      name: 'Lobby'
    },
    {
      name: 'Reception'
    },
    {
      name: 'Bathroom'
    },
    {
      name: 'Outdoor'
    },
    {
      name: 'Video'
    },
    // {
    //   name: 'Tariff'
    // },
  ]

  getHotelAmenities() {
    this.apiRequest.get('/get-amenities').subscribe(
      res => {
        if (res.responseCode == 200) {
          this.hotelamenities = res.data;
        } else {
          // console.log(res)
        }
      }, err => {
        console.log(err)
      });
  }

  getRoomsAmenities() {
    this.apiRequest.get('/get-room-amenities').subscribe(
      res => {
        // console.log("Room Amenitites", res);
        if (res.responseCode == 200) {
          this.roomamenities = res.data;
        } else {
          // console.log(res)
        }
      }, err => {
        console.log(err)
      });
  }

  getImageName(name: string) {
    this.hotelimageName = name;
    this.imageData = [];
    this.hotel_images.forEach((value: any, index: any) => {
      this.currentVideo = '';
      if (this.hotelimageName != value.name && value.name != 'Video' && value.name != 'Logo') {
        this.imageData.splice(index);
      }
      else if (this.hotelimageName == value.name && value.name == 'Video' && value.name != 'Logo') {
        this.currentModalHotelImg = this.apiRequest.serviceurl + value.path;
        this.imageData.splice(index);
      }
      else if (this.hotelimageName == value.name && value.name != 'Video' && value.name != 'Logo') {
        let image = {
          srcUrl: this.apiRequest.serviceurl + value.path,
          previewUrl: this.apiRequest.serviceurl + value.path
        };
        this.imageData.push(image);
      }
      let image = {
        srcUrl: this.apiRequest.serviceurl + value.path,
        previewUrl: this.apiRequest.serviceurl + value.path
      };
      this.imageData.push(image);


    });

    this.items = this.imageData.map((item: { srcUrl: any; previewUrl: any; }) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
  }
  firstRoom: any = {}
  shimmerLoad: boolean = true;
  hotel_amenities: any = [];
  hotel_rooms: any = [];
  hotelImagesName: any = [];
  hotelimageName: string = ''
  getHotelDetails(hotel_id: any) {
    let obj = {
      hotel_id: hotel_id,
      city: this.recent_search.city
    }
    this.apiRequest.post('/get-hotel-details', obj).subscribe(
      res => {
        this.hoteldata = res.data;
        console.log("Content", res.data);
        if (res.data) {
          this.setTitle(res.data.name);
        }
        res.data.hotel_rooms.forEach((data: any) => {
          const newData: any = []
          if (Array.isArray(data.room_amenities)) {
            data.room_amenities.forEach((id: string) => {
              this.roomamenities.forEach((data: any) => {
                if (data.id === id) {
                  newData.push(data);
                }
              });
            });
            this.hotel_rooms.push({ amenityObj: newData, ...data });
            this.hotel_rooms = this.sortPipe.transform(this.hotel_rooms, "asc", "price");
          }
        });
        console.log("Content", this.hotel_rooms);
        this.recommended_hotels = res.data.recommended_hotels;
        // this.hotelDescription = res.data.description.replace(/<[^>]*>/g, '').length;
        // this.shortContent(this.hoteldata.HotelOtherInfo[0].content);
        this.hotel_images = this.hoteldata.hotel_images;
        console.log("image", this.hotel_images)
        let Frontdata: any = [];
        let Lobby: any = [];
        let Reception: any = [];
        let Bathroom: any = [];
        let Outdoor: any = [];
        res.data.hotel_images.forEach((value: any) => {
          switch (value.name) {
            case 'Front': {
              Frontdata.push(value);
              break;
            }
            case 'Lobby': {
              Lobby.push(value);
              break;
            }
            case 'Reception': {
              Reception.push(value);
              break;
            }
            case 'Bathroom': {
              Bathroom.push(value);
              break;
            }
            case 'Outdoor': {
              Outdoor.push(value);
              break;
            }

          }
        });
        // console.log("Front", Frontdata);
        // console.log("Lobby", Lobby);
        // console.log("Reception", Reception);
        // console.log("Bathroom", Bathroom);
        // console.log("Outdoor", Outdoor);
        this.hotel_category_images = [
          ...Frontdata, ...Lobby, ...Reception, ...Bathroom, ...Outdoor
        ]
        // console.log("Hotel Images", this.hotel_images);
        this.shimmerLoad = false;
        this.hotel_amenities = [];
        this.hotelamenities.forEach((value: any) => {
          if (Array.isArray(res.data.hotel_amenities)) {
            if (res.data.hotel_amenities.includes(value.id)) {
              this.hotel_amenities.push(value);
            }
          }
        });
        this.imageData = [];
        this.hotelImagesName = [];
        // res.data.hotel_images.forEach((value: any) => {
        //   if (value.name == 'Front') {
        //     let image = {
        //       srcUrl: this.apiRequest.serviceurl + value.path,
        //       previewUrl: this.apiRequest.serviceurl + value.path
        //     };
        //     this.imageData.push(image);
        //   }
        // });
        res.data.hotel_images.forEach((value: any, index: number) => {
          if (value.name != 'Logo') {
            if (this.hotelImagesName.includes(value.name)) {
              this.hotelImagesName.slice(value.name);
            } else {
              this.hotelImagesName.push(value.name);
            }
          }
        });
        this.hotelimageName = '';
        res.data.hotel_images.forEach((value: any) => {
          let image = {
            srcUrl: this.apiRequest.serviceurl + value.path,
            previewUrl: this.apiRequest.serviceurl + value.path
          };
          this.imageData.push(image);
          this.items = this.imageData.map((item: { srcUrl: any; previewUrl: any; }) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
        });


        this.faqs = res.data.FAQ
        if (this.hoteldata.hotel_rooms.length > 0) {
          this.firstRoom = {
            price: this.hoteldata.hotel_rooms[0].price,
            room_type: this.hoteldata.hotel_rooms[0].room_type,
            room_amenities: this.hoteldata.hotel_rooms[0].room_amenities,
            description: this.hoteldata.hotel_rooms[0].description,
          }
          // Get first room for bidding
          this.cureentSelectedRoomDetails = this.hotel_rooms[0];
          this.cureentSelectedRoomViews = this.hoteldata.hotel_rooms[0].room_views;
          this.cureentSelectedRoomAmenities = [];
          this.roomamenities.forEach((value: any) => {
            if (Array.isArray(this.hoteldata.hotel_rooms[0].room_amenities)) {
              if (this.hoteldata.hotel_rooms[0].room_amenities.includes(value.id)) {
                this.cureentSelectedRoomAmenities.push(value);
              }
            }
          });
          // console.log("First Selection amenities", this.cureentSelectedRoomAmenities);
        }
        // console.log("Hotel Images", this.currentImg);
        if (this.hotel_category_images.length > 0) {
          this.currentImg = this.apiRequest.serviceurl + this.hotel_category_images[0].path;
        } else {
          this.currentImg = ''
        }
      });

  }

  shortContent(content: any) {
    if (content.startsWith('<p>')) {
      var message = content.slice(0, 200) + '...</p>';
      // console.log("Hotel data message: ", message);
      return content.slice(0, 200) + '...</p>'
    } else {
      return content.slice(0, 200);
    }
  }


  showMore() {
    this.showAmenities = !this.showAmenities;
    if (this.showAmenities) {
      this.showAmenityText = 'Show More';
    } else {
      this.showAmenityText = 'Show Less';
    }
  }
  showRoomMore() {
    this.showRoomAmenities = !this.showRoomAmenities;
    if (this.showRoomAmenities) {
      this.showRoomAmenityText = 'Show More';
    } else {
      this.showRoomAmenityText = 'Show Less';
    }
  }

  showAddonMore() {
    this.showAddon = !this.showAddon;
    if (this.showAddon) {
      this.showAddonText = 'Show More';
    } else {
      this.showAddonText = 'Show Less';
    }
  }


  image_show: boolean = false;
  currentHotelImg: string = "";
  showImage(imgUrl: string) {
    this.image_show = true;
    // this.currentHotelImg = imgUrl;
    console.log(imgUrl);
  }


  // roomSlider(data: any) {
  //   // console.log(data);
  //   this.roomModel = true;
  //   this.roomImages = data;
  //   this.roomImagesName = [];
  //   this.roomimageData = [];
  //   data.forEach((value: any, index: number) => {
  //     if (this.roomImagesName.includes(value.name)) {
  //       this.roomImagesName.slice(value.name);
  //     } else {
  //       this.roomImagesName.push(value.name);
  //     }
  //   });
  //   console.log("dsfdsfsdf", data)

  //   this.roomimageName = '';
  //   console.log("this.roomImagesName", this.roomImagesName)
  //   this.getRoomImages(data, '');
  // }

  // getRoomImages(data: any, name: string) {
  //   this.roomimageName = name;
  //   this.roomimageData = [];

  //   data.forEach((value: any, index: any) => {
  //     if (name === value.name) {
  //       let image = {
  //         srcUrl: this.apiRequest.serviceurl + value.path,
  //         previewUrl: this.apiRequest.serviceurl + value.path
  //       };
  //       this.roomimageData.push(image);
  //       console.log("Photo album", this.roomimageData);
  //     } else if (name === '') {
  //       let image = {
  //         srcUrl: this.apiRequest.serviceurl + value.path,
  //         previewUrl: this.apiRequest.serviceurl + value.path
  //       };
  //       this.roomimageData.push(image);
  //       console.log("Photo album", this.roomimageData);
  //     }
  //   });
  //   this.roomitems = this.roomimageData.map((item: { srcUrl: any; previewUrl: any; }) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));

  // }




  showMap() {
    this.image_show = false;
  }

  show_bid: boolean = false;
  showBid(show: number) {
    if (show == 0) {
      this.show_bid = true;
    }
    else if (show == 1) {
      this.show_bid = false;
    }
  };

  value: number = 0;
  handleMinus() {
    this.value--;
  }

  handlePlus() {
    this.value++;
  }

  show_room: boolean = false;
  showAddRoom() {
    this.show_room = !this.show_room;
  }

  opendetailsshow: boolean = false;
  opendetails() {
    this.opendetailsshow = !this.opendetailsshow
  }

  // Show Modal
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  closeRoomModal() {
    this.roomModel = false;
  }

  // Category Slider
  categoryOptions: OwlOptions = {
    loop: false,
    margin: 5,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1.3,
        loop: true
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  // Category Slider
  recommenedOptions: OwlOptions = {
    loop: false,
    margin: 15,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    nav: false,
    responsive: {
      0: {
        items: 1.3,
        loop: true
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4,
        nav: true
      },
      1200: {
        items: 4,
        nav: true
      }
    },
  }

  imagesOptions: OwlOptions = {
    loop: false,
    margin: 15,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  };

  // ...........
  //  Modal Image
  // ...........
  image_modal_show: boolean = false;
  currentModalHotelImg: string = "";
  image_type: string = "";
  showLargeImage(imgUrl: string, name: string) {
    this.image_modal_show = true;
    this.currentModalHotelImg = imgUrl;
    this.image_type = name;
  }
  roomModel: boolean = false;
  roomImages: any = [];
  roomImagesName: any = [];
  roomimageName: string = '';

  roomSlider(data: any) {
    // console.log(data);
    this.roomModel = true;
    this.roomImages = data;
    this.roomImagesName = [];
    this.roomimageData = [];
    data.forEach((value: any, index: number) => {
      if (this.roomImagesName.includes(value.name)) {
        this.roomImagesName.slice(value.name);
      } else {
        this.roomImagesName.push(value.name);
      }
    });
    console.log("dsfdsfsdf", data)

    this.roomimageName = '';
    console.log("this.roomImagesName", this.roomImagesName)
    this.getRoomImages(data, '');
  }

  getRoomImages(data: any, name: string) {
    this.roomimageName = name;
    this.roomimageData = [];

    data.forEach((value: any, index: any) => {
      if (name === value.name) {
        let image = {
          srcUrl: this.apiRequest.serviceurl + value.path,
          previewUrl: this.apiRequest.serviceurl + value.path
        };
        this.roomimageData.push(image);
        console.log("Photo album", this.roomimageData);
      } else if (name === '') {
        let image = {
          srcUrl: this.apiRequest.serviceurl + value.path,
          previewUrl: this.apiRequest.serviceurl + value.path
        };
        this.roomimageData.push(image);
        console.log("Photo album", this.roomimageData);
      }
    });
    this.roomitems = this.roomimageData.map((item: { srcUrl: any; previewUrl: any; }) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));

  }

  // getRoomDataForBidding(data: any, i: number) {
  //   this.roomSelectedForBidding = true;
  //   this.data_for_bidding = data;
  //   let room_qty = 1;
  //   let room_price = this.data_for_bidding.price;
  //   this.firstRoom = {
  //     price: this.data_for_bidding.price,
  //     room_type: this.data_for_bidding.room_type,
  //   }
  //   if (this.adult > this.data_for_bidding.capacity) {
  //     room_qty = Math.floor(this.adult / this.data_for_bidding.capacity) + 1;
  //     room_price = room_price * room_qty;
  //     this.totalRooms = room_qty;
  //     this.totalAmount = room_price;
  //   } else {
  //     room_qty = 1;
  //     room_price = room_price * room_qty;
  //     this.totalRooms = room_qty;
  //     this.totalAmount = room_price;
  //   }
  //   this.selected_room_capacity = this.data_for_bidding.capacity;
  //   this.categoryActive = i
  // }

  // Get_Rooms() {
  //   var RoomsCurrentQty = this.adult / this.data_for_bidding.capacity;
  //   RoomsCurrentQty = Math.ceil(RoomsCurrentQty);
  //   this.RoomsQuantity = this.ShowMinRooms = RoomsCurrentQty;
  // }

  CheckRoomQuanity() {
    if (this.ShowMinRooms > this.RoomsQuantity) {
      this.ShowRoomQuantityWarning = true;
    } else {
      this.ShowRoomQuantityWarning = false;
    }
  }

  // Redesign BID Process 

  getDateRange(event: any) {
    this.checkinDate = event[0];
    this.checkoutDate = event[1];
    console.log("Date range:", this.checkinDate, this.checkoutDate);
    this.getDiffOfChekInCheOut(this.checkinDate, this.checkoutDate);
    this.maxBidPrice();
    this.getHotelTotalAmt()
  }

  getDiffOfChekInCheOut(checkin: any, checkout: any) {
    this.DateDiffDays = +(checkout - checkin) / (1000 * 60 * 60 * 24);
    console.log("Diffrence:", this.DateDiffDays)
  }

  CheckIn(event: any) {
    this.checkin_date_value = event
    if (this.checkout_date_value) {
      this.getDiffOfChekInCheOut(this.checkin_date_value, this.checkout_date_value);
    }
  }

  CheckOut(event: any) {
    this.checkout_date_value = event
    this.getDiffOfChekInCheOut(this.checkin_date_value, this.checkout_date_value);
  }

  getSelectedRoomForBidding(selectedRoom: any, index: number) {
    this.categoryActive = index;
    this.selectedRoomCapacity = selectedRoom.capacity;
    this.selectedRoomPrice = selectedRoom.price;
    this.cureentSelectedRoomDetails = selectedRoom;
    this.cureentSelectedRoomViews = selectedRoom.room_views;
    this.cureentSelectedRoomAmenities = [];
    this.roomamenities.forEach((value: any) => {
      if (Array.isArray(selectedRoom.room_amenities)) {
        if (selectedRoom.room_amenities.includes(value.id)) {
          this.cureentSelectedRoomAmenities.push(value);
        }
      }
    });
    // console.log("current Selection amenities", this.cureentSelectedRoomAmenities);
    // this.cureentSelectedRoomAmenities = selectedRoom.room_amenities;
  }

  ShowRoomQTYWarning: boolean = false;
  CheckRoomQty(event: any) {
    if (this.previous_roomsQTY > event.target.value) {
      this.ShowRoomQTYWarning = true;
    } else {
      this.ShowRoomQTYWarning = false;
    }
  }

  adult: number = 1;
  getAdultCountForRoomQTY(event: any) {
    this.getDiffOfChekInCheOut(this.checkinDate, this.checkoutDate);
    this.adult = event.target.value;
    this.roomsQTY = Math.ceil(this.adult / this.cureentSelectedRoomDetails.capacity);
    this.previous_roomsQTY = this.roomsQTY;
    this.maxBidPrice();
    // console.log("room Qty", this.roomsQTY);
  }

  is_refunded: boolean = false;
  isRefunded() {
    this.is_refunded = !this.is_refunded;
  }

  getBidPrice(event: any): boolean {
    // var price = event.target.value;
    this.bid_price = event.target.value;
    this.getDiffOfChekInCheOut(this.checkinDate, this.checkoutDate);
    this.maxBidPrice();
    this.invalidBidForm = false;
    this.collectBidPrice = event.target.value;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  letsBid: boolean = false;
  maxBidPrice() {
    // console.log(this.bid_price)
    if (this.adult > 0 && this.bid_price) {
      if (this.bid_price > (this.cureentSelectedRoomDetails.price * this.roomsQTY * this.DateDiffDays)) {
        // console.log("Price", this.bid_price);
        this.letsBid = false
      } else if (this.bid_price <= (this.cureentSelectedRoomDetails.price * this.roomsQTY * this.DateDiffDays)) {
        this.letsBid = true
      }
    } else {
      this.letsBid = false
    }
    // return true;
  }


  invalidBidForm: boolean = false;
  recent_bid_msg: string = '';
  fiveBid: any = [];
  onBidPlace(checkinDate: any, checkoutDate: any, roomsQTY: any, price: any, room_type: any, is_refunded: any, bid_price: any, adultCount: any, childCount: any, downfall: number) {
    this.checkin_date = this.recent_search.arrival;
    this.checkout_date = this.recent_search.departure;
    if (checkinDate && checkoutDate) {
      this.checkin_date = checkinDate;
      this.checkout_date = checkoutDate;
      this.DateDiffDays = +(checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
    } else {
      this.DateDiffDays = 1;
    }
    let data = {
      // arrival: new Date(this.checkin_date).toLocaleDateString(),
      // departure: new Date(this.checkout_date).toLocaleDateString(),
      arrival: this.datePipe.transform(this.checkin_date, 'dd/MM/YYYY'),
      departure: this.datePipe.transform(this.checkout_date, 'dd/MM/YYYY'),
      rooms: roomsQTY,
      // room_price: Math.round(parseFloat(price) * this.DateDiffDays * roomsQTY),
      room_price: price,
      room_type: room_type,
      is_refundable: is_refunded,
      bid_price: Math.round(bid_price),
      adult: adultCount,
      child: childCount,
      hotel_id: this.current_hotel_sys_id,
      userId: this.user_all_data.userId,
      hotel_name: this.hoteldata.name,
      firstname: this.user_all_data.firstname,
      lastname: this.user_all_data.lastname,
      email: this.user_all_data.email,
      days: this.DateDiffDays
    }
    // console.log("Recent Bid", this.recent_bidding);
    // console.log("Bid data", data);
    if (this.recent_bidding.length < 5) {
      this.recent_bidding.forEach((value: any) => {
        let currentTime = new Date();
        var hours = moment.utc(moment(new Date(), "HH:mm:ss a").diff(moment(new Date(value.createdAt), "HH:mm:ss a"))).format("HH");
        var minutes = moment.utc(moment(new Date(), "HH:mm:ss a").diff(moment(new Date(value.createdAt), "HH:mm:ss a"))).format("mm");
        let diffHour = parseInt(hours);
        let diffMinute = parseInt(minutes);
        if (diffHour < 1) {
          let remainingtime = (30 - diffMinute);
          // console.log("date", moment(new Date(value.createdAt), "h:mm:ss a"));
          if (value.arrival_date == data.arrival && value.departure_date == data.departure && value.adult == data.adult && value.rooms == data.rooms && diffMinute < 30) {
            this.recent_bid_msg = 'Your Not Able to Bid Same as recent bid before ' + moment(new Date(currentTime.getTime() + remainingtime * 60000)).format("h:mm:ss a");
          }
        }
      });
      if (!this.recent_bid_msg) {
        let downfallRatio = 100 - downfall; //  reverse bidding price check if downfall is 40% then 60% would be min bid price; instead of downfall use downfallRatio

        localStorage.setItem("recent_bid", JSON.stringify(this.fiveBid));
        if (data.adult == 0 || data.days == 0 || data.bid_price == null) {
          this.invalidBidForm = true;
        }
        else if (data.bid_price >= ((data.room_price * downfall * data.rooms) / 100)) {
          let url = '/place-bid';
          this.invalidBidForm = false;
          Swal.fire({
            title: 'Confirm Your Bid',
            text: 'On ' + data.room_type,
            imageUrl: '../../../../../assets/images/icons/shield (1).svg',
            showCancelButton: true,
            confirmButtonText: 'Yes, Do it!',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {
              this.apiRequest.post(url, data).subscribe(
                res => {
                  // console.log("Bid Data", res)
                  this.bidResponseCode = res.responseCode;
                  if (this.bidResponseCode == 200) {
                    this.bidMsg = res.msg;
                    this.bidPlaced = true;
                    setTimeout(() => {
                      this.bidPlaced = false;
                      this.router.navigateByUrl('/bidhistory/bid')
                    }, 3000);
                  } else {
                    this.recent_bid_msg = res.msg;
                  }
                }, err => {
                  console.log(err);
                }
              );
            }
          });


        }
        //same changes here-------------------------------------------------------------------------------------------------------------------------------
        else if (data.bid_price < ((data.room_price * downfall * data.rooms) / 100)) {
          let url = '/rejected-bid';
          this.invalidBidForm = false;
          Swal.fire({
            title: 'Confirm Your Bid',
            text: 'On ' + data.room_type,
            imageUrl: '../../../../../assets/images/icons/shield (1).svg',
            showCancelButton: true,
            confirmButtonText: 'Yes, Do it!',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {
              this.apiRequest.post(url, data).subscribe(
                res => {
                  if (res.responseCode == 200) {
                    // this.bidMsg = "Very Low Amount - kindly Rebid";
                    // this.bidRejected = true;
                    this.errorAlert = true;
                    this.error_msg = "Bid is too Low - kindly Rebid";
                    console.log("Bid is too Low - kindly Rebid", res);
                    setTimeout(() => {
                      // this.bidRejected = false;
                      this.error_msg = "";
                      this.errorAlert = false;
                      window.location.reload();
                    }, 2500);
                  }
                }, err => {
                  console.log('Unexpected error occured ' + err);
                }
              );
            }
          });
        }
      }
    } else {
      this.recent_bid_msg = 'Your Not Able to Bid More than 5 in a Day';
    }
    // localStorage.setItem("recent_bid", JSON.stringify(data));

  }
  showQueryModal: boolean = false;
  successAlert: boolean = false;
  errorAlert: boolean = false;
  bulkEnquiry() {
    this.showQueryModal = !this.showQueryModal;
  }

  onAddQuery(form: NgForm) {
    let data = Object.assign({}, form.value);
    let bulkData = {
      userId: this.user_all_data.userId,
      email: data.email,
      mobile: data.contact,
      persons: data.persons,
      subject: data.subject,
      content: data.message,
      startdate: this.datePipe.transform(data.bulk_date_range[0], 'MM-dd-yyy'),
      enddate: this.datePipe.transform(data.bulk_date_range[1], 'MM-dd-yyy'),
    }
    this._apiRequest.bulkEnquiry(bulkData).subscribe(
      res => {
        if (res.responseCode == 200) {
          form.reset();
          this.showQueryModal = false;
          // this.common.showAlertBox(res.msg, 'success');
          this.successAlert = true;
          this.success_msg = res.msg;
          setTimeout(() => {
            this.successAlert = false;
          }, 2000);
        } else {
          // console.log("Error", res)
          this.errorAlert = true;
          this.error_msg = res.msg;
          setTimeout(() => {
            this.errorAlert = false;
          }, 3000);
          // this.common.showAlertBox(res.msg, 'error');
        }
      }, err => {
        console.log(err)
      }
    )
  }
  collectBidPrice: any;
  numberOnly(event: any): boolean {
    this.invalidBidForm = false;
    this.collectBidPrice = event.target.value;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  userRatings: any = [];

  get_hotel_ratings(hotel_id: string) {
    let url = '/get-hotel-ratings';
    this.apiRequest.post(url, { hotel_id: hotel_id }).subscribe(
      res => {
        // console.log("Res", res);
        if (res.responseCode == 200) {
          this.userRatings = [];
          res.data.forEach((ratingData: any) => {
            let profileUrl = '/get-user-profile';
            this.apiRequest.post(profileUrl, { userId: ratingData.userId }).subscribe(
              res => {
                if (res.responseCode == 200) {
                  this.userRatings.push({ profile_img: res.data.profile_img ? res.data.profile_img : '', name: res.data.firstname + " " + res.data.lastname, ...ratingData });
                  this.userRatings = this.sortPipe.transform(this.userRatings, "deasc", "createdAt");
                }
                console.log(this.userRatings)
              },
              err => {
                console.log(err);
              }
            );
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  loadHotel() {
    var that = this;
    // that.apiRequest.loader = true;
    window.location.reload()
    // let scrollToTop = window.setInterval(() => {
    //   let pos = window.pageYOffset;
    //   if (pos > 0) {
    //     window.scrollTo(0, pos - 20);
    //   } else {
    //     window.clearInterval(scrollToTop);
    //   }
    // }, 2);
    setTimeout(function () {
      // that.apiRequest.loader = false;
    }, 500);
  }


  moreChar: boolean = false;

  readMoreText() {
    this.moreChar = !this.moreChar;
  }


  addonList: any = [];
  getHotelAddonsList(hotel_id: string) {
    let url = '/get-hotel-addon';

    this.apiRequest.post(url, hotel_id).subscribe(
      res => {
        // console.log(res)
        if (res.responseCode == 200) {
          this.addonList = [];
          res.data.forEach((value: any) => {
            if (value.hotel_id == this.hotel_id) {
              this.addonList.push(value);
            }
          });
        } else {
          // console.log(res)
        }
      }, err => {
        console.log(err)
      }
    );
  }


  is_child: boolean = false;
  veriryChildAge() {
    this.childCount = 0;
    this.is_child = !this.is_child;
  }

  // infoForm = this.fb.group({
  //   bid__price: ['', [
  //     Validators.required,
  //     Validators.minLength(1)
  //   ]
  //   ]
  // });
  // get bid__price() { return this.infoForm.get('bid__price'); }

  onHotelDetails(city: string) {
    this._apiRequest.setHotelBooking(city);
  }



  sortDesc(text: any, len: number) {
    let moreSign: string = '...';
    if (text.length > len) {
      return text.slice(0, len) + '...';
    } else {
      return text.slice(0, text.length);
    }
  }

  reload() {
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  descType: string = '';
  showMoreDesc(type: string) {
    this.descType = type;
  }
  getAllAmenities(data: any) {
    // console.log("sdfdsf ameitiss", data)
  }
  getMapUrl(latitude: any, longitude: any) {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`;
  }
  // @ViewChild(MapInfoWindow, { static: false })
  // infoWindow!: MapInfoWindow;

  // center = { lat:  parseFloat(this.hoteldata.latitude), lng:  parseFloat(this.hoteldata.longitude) };
  // markerOptions = { draggable: false };
  // markerPositions: google.maps.LatLngLiteral[] = [];
  // zoom = 4;
  // display?: google.maps.LatLngLiteral;

  // addMarker(event: google.maps.MouseEvent) {
  //   this.markerPositions.push(event.latLng.toJSON());
  // }

  // move(event: google.maps.MouseEvent) {
  //   this.display = event.latLng.toJSON();
  // }

  // openInfoWindow(marker: MapMarker) {
  //   this.infoWindow.open(marker);
  // }

  // removeLastMarker() {
  //   this.markerPositions.pop();
  // }

  is_open_share_model: boolean = false;


  whatsapp_share_URL: string = `https://api.whatsapp.com/send/?+91840077147&text=Check out this jusbid ${window.location.href}`;
  mail_share_URL: string = `mailto:ithead@jusbid.in?subject=Check out this jusbid ${window.location.href}`;



  // let address = area ? area + ',' : '' + landmark ? landmark + ',' : '' + city ? city + ',' : '' + state ? state + ',' : '' + '-' + '(' + zipCode ? zipCode : '' + ')' + country ? country : '';

  getHotelfullAddress(landmark: string, street: string, area: string, city: string, state: string, zipCode: string, country: string) {
    return `${area} ${landmark} ${city} ${state}-(${zipCode}) ${country}.`
  }



  go_to_details_page(hotelId: string) {
    this.router.navigate(['/hotel/id/', hotelId]);
    setTimeout(() => {
      window.location.reload();
      window.scroll(0, 0);
    }, 1000)
  }


  grandTotalAmt: any = 0;
  getHotelTotalAmt() {
    let selected_Room: any = this.cureentSelectedRoomDetails.length != 0 ? this.cureentSelectedRoomDetails : this.hotel_rooms[0];
    this.grandTotalAmt = ((this.DateDiffDays ? this.DateDiffDays : 1) * (this.roomsQTY * (selected_Room?.price + selected_Room?.price * 0.10))).toLocaleString();
    console.log("Amt:", this.cureentSelectedRoomDetails);
    console.log("Amt:", this.hoteldata);
  }

  is_adult_grthn_roomCap(adultCount: any, roomCap: any, roomsQTY: any) {
    return adultCount > (roomCap * roomsQTY)
  }

}

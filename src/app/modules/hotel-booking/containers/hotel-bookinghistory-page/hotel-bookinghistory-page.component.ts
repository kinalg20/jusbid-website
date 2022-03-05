import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { pluck, toArray } from 'rxjs/operators';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { CommonService } from 'src/app/modules/core/services/common.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-hotel-bookinghistory-page',
  templateUrl: './hotel-bookinghistory-page.component.html',
  styleUrls: ['./hotel-bookinghistory-page.component.scss'],
})
export class HotelBookinghistoryPageComponent implements OnInit {
  searchQuery: any;
  recent_booking: any = [];
  math: any = Math;
  myBookingList: any = [];
  bookinglisted: any = [];
  booking_status: string = 'all';
  booking_name_status: string = 'All Bookings';
  showRecent_booking: boolean = true;
  showRecent_bookingText: string = 'See More';
  today_data: Date = new Date();
  current_date: any;
  successAlert: boolean = false;
  booking_all_data: any;
  apiBaseURL: string = '';
  userData: any = {};
  myCustomersList: any = [];
  minDate = new Date();
  refundminDate = new Date();
  maxDate = new Date();
  date_arrival: any;
  date_refund: any;
  alertMsg: string = '';
  hotelID: string = '';
  bookingID: string = '';
  userId: string = '';
  isTravelAgent: boolean = false;
  constructor(
    // private route: ActivatedRoute,
    private apiRequest: ApiService,
    private _apiRequest: ApiRequestService,
    private datepipe: DatePipe,
    public _common: CommonService,
    public router: Router
  ) {
    // this.minDate.setDate(this.minDate.getDate());

    this.date_refund = this.datepipe.transform(
      this.refundminDate.setDate(this.refundminDate.getDate() + 14),
      'dd/MM/YYYY'
    );
  }

  ngOnInit(): void {
    this.apiBaseURL = this.apiRequest.serviceurl;
    this.userData = this._common.getLogedinUserData();
    this.getRecentBooking(this.userData.userId);
    this.getCustomer(this.userData.userId);
    this.date_arrival = this.datepipe.transform(this.minDate, 'dd/MM/YYYY');
    // console.log("refund date", this.date_refund);
    this.userIsTravlAgent();
    // console.log('dfdsf', this.isTravelAgent);
  }

  userIsTravlAgent() {
    this._apiRequest
      .getUserInformationsByUid(this.userData.userId)
      .subscribe((res) => {
        if (res.data.role === 4) {
          this.isTravelAgent = true;
        } else {
          this.isTravelAgent = false;
        }
      });
  }

  getCustomer(uid: string) {
    this._apiRequest.getMyTravelAgentsCustomers(uid).subscribe(
      (res) => {
        if (res.responseCode == 200) {
          this.myCustomersList = res.data;
        } else {
          this.myCustomersList = [];
        }
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  shimmerLoad: boolean = true;

  displayBookingList: any = [];

  getRecentBooking(uid: any) {
    let bookingData = {};
    this._apiRequest.getMyBookings(uid).subscribe(
      (res) => {
        // arrival_date
        if (res.responseCode == 200) {
          from(res.data)
            .pipe(
              map((res: any) => {
                let obj = {
                  is_cancel: this.is_cancled_booking_now(res.arrival_date),
                  ...res,
                };
                // is_complaint: this.is_complaint_booking_now(res.arrival_date, res.departure_date),
                return obj;
              }),
              toArray()
            )
            .subscribe((res) => {
              res.forEach((hotelData: any) => {
                this._apiRequest
                  .get_hotel_by_hotelId(hotelData.hotel_id)
                  .subscribe((res) => {
                    this.myBookingList.push({
                      hotel_img: res.data.image,
                      ...hotelData,
                    });
                  });
              });
              this.bookinglisted = this.myBookingList.sort((a: any, b: any) =>
                a.createdAt > b.createdAt ? 1 : -1
              );
              this.recent_booking = this.myBookingList;

              this.shimmerLoad = false;
              // console.log('from booking', this.bookinglisted);
            });
        } else {
          this.shimmerLoad = false;
          // console.log(res);
        }

        // res.data.forEach((booking: any) => {
        //   this.myBookingList.push(
        //     {
        //       ...booking,
        //       arrival_date:this.datepipe.transform(Date.parse(booking.arrival_date), 'dd/MM/YYYY'),
        //       departure_date:this.datepipe.transform(Date.parse(booking.departure_date), 'dd/MM/YYYY')
        //     }

        //   );
        // });
        // console.log("Booking List", this.myBookingList);
        // console.log(this._apiRequest.getAbsolutePath(res.data.image));

        // this.myBookingList = this.recent_booking;

        // recent_booking
      },
      (err) => {
        this.shimmerLoad = false;
        // console.log(err);
      }
    );
  }

  is_cancled_booking_now(arrival_date: string) {
    // today + 15
    // let today = new Date();
    // let after15days: any = this.datepipe.transform(
    //   today.setDate(today.getDate() + 15), 'dd/MM/YYYY');
    let startingdate = moment(arrival_date, 'DD/MM/YYYY');
    let after15days: any = moment(this.date_refund, 'DD/MM/YYYY');
    let startdate = startingdate.format('MM/DD/yyyy');
    let enddate = after15days.format('MM/DD/yyyy');
    // console.log("after 15 days:", enddate)

    // var varDate = new Date(arrival_date); //dd-mm-YYYY
    // var after15daysDate = new Date(after15days); //dd-mm-YYYY

    if (startdate > enddate) {
      //Do something..
      return true;
    }

    return false;
  }
  // is_complaint_booking_now(arrival_date: string, departure_date: string) {
  //   let today = new Date();
  //   let startingdate = moment(arrival_date, 'DD/MM/YYYY');
  //   let endingdate = moment(departure_date, 'DD/MM/YYYY');
  //   let compalintDate: any = moment(today, 'DD/MM/YYYY');
  //   let startdate = startingdate.format('MM/DD/yyyy');
  //   let enddate = endingdate.format('MM/DD/yyyy');
  //   let compalint_date = compalintDate.format('MM/DD/yyyy');
  //   if (compalint_date >= startdate   && enddate > compalint_date) {
  //     return true;
  //   }

  //   return false;
  // }

  hotelImg: string = '';
  getHotelImageByHotelId(hotelID: string) {
    this._apiRequest.get_hotel_by_hotelId(hotelID).subscribe((res) => {
      this.hotelImg = this._apiRequest.getAbsolutePath(res.data.image);
    });
  }

  showMore() {
    this.showRecent_booking = !this.showRecent_booking;
    if (this.showRecent_booking) {
      this.showRecent_bookingText = 'See More';
    } else {
      this.showRecent_bookingText = 'See Less';
    }
  }

  noRecentBooking: string = '';
  getBookingsByStatus(status: string, name: string) {
    this.booking_status = status;
    this.booking_name_status = name;
    this.noRecentBooking = '';
    this.myBookingList = [];
    this.recent_booking.forEach((value: any) => {
      if (this.booking_status == 'all') {
        // this.noRecentBooking = '';
        this.myBookingList.push(value);
      } else if (this.booking_status != 'all') {
        if (value.status == this.booking_status) {
          // this.noRecentBooking = '';
          this.myBookingList.push(value);
        }
        // else {
        //   this.noRecentBooking = 'No Booking Available Of ' + status;
        // }
      }
    });
    // console.log("Status", this.booking_status, "Msg", this.noRecentBooking)
  }

  rating: any = {
    start_1: false,
    start_2: false,
    start_3: false,
    start_4: false,
    start_5: false,
  };

  stars: number[] = [1, 2, 3, 4, 5];
  selectStart: boolean = false;
  value: number = 1;
  location: number = 1;
  clean: number = 1;
  service: number = 1;
  countStarForValue(star: number, i: number) {
    this.value = star;
  }
  countStarForLocation(star: number, i: number) {
    this.location = star;
  }
  countStarForClean(star: number, i: number) {
    this.clean = star;
  }
  countStarForService(star: number, i: number) {
    this.service = star;
  }

  is_opnRatingModal: boolean = false;
  getRatinDetails(booking_id: string, hotel_id: string) {
    this.is_opnRatingModal = true;
    this.hotelID = hotel_id;
    this.bookingID = booking_id;
  }
  is_opnIssueModal: boolean = false;
  getIssueDetails(booking_id: string, hotel_id: string) {
    this.is_opnIssueModal = true;
    this.hotelID = hotel_id;
    this.bookingID = booking_id;
  }

  closeRatingModal() {
    this.is_opnRatingModal = false;
  }
  closeIssueModal() {
    this.is_opnIssueModal = false;
  }

  getUserReviews(form: NgForm) {
    let data = Object.assign({}, form.value);
    let obj = {
      hotel_id: this.hotelID,
      userId: this.userData.userId,
      booking_id: this.bookingID,
      value: this.value,
      location: this.location,
      clean: this.clean,
      service: this.service,
      feedback: data.feedback,
    };
    // req.body.hotel_id || !req.body.userId || !req.body.value || !req.body.clean || !req.body.location || !req.body.service
    this.saveUserRatings(obj);
  }

  saveUserRatings(obj: any) {
    let apiURL = '/save-rating';
    this.apiRequest.post(apiURL, obj).subscribe(
      (res) => {
        // window.location.reload();
        // console.log('Rating', res);
        if (res.responseCode == 200) {
          this.is_opnRatingModal = false;
          this.successAlert = true;
          this.alertMsg = res.msg;
          setTimeout(() => {
            this.successAlert = false;
          }, 3000);
        } else {
          // console.log(res);
        }
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  cancelMyBooking(id: string, name: string, cancel: boolean) {
    let cancelUrl = `/cancel-my-booking`;
    let msg;
    if (cancel) {
      msg = 'You are eligible for Full Refund';
      Swal.fire({
        title: 'Are you sure?',
        html:
          'You want to Cancel Booking of <b>' + name + '</b><p>' + msg + '</p>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Cancel it!',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.apiRequest.post(cancelUrl, { booking_id: id }).subscribe(
            (res) => {
              // console.log("Cancel Booking", res)
              if (res.responseCode == 200) {
                this.getRecentBooking(this.userData.userId);
                this.successAlert = true;
                this.alertMsg = res.msg;
                setTimeout(() => {
                  this.successAlert = false;
                }, 3000);
              } else {
                // console.log('Error', res);
              }
            },
            (err) => {
              // console.log(err);
            }
          );
        }
      });
    } else {
      msg = 'You are not eligible for refund';
      Swal.fire({
        title: 'Are you sure?',
        html:
          'You want to Cancel Booking of <b>' +
          name +
          '</b><p>' +
          msg +
          '</p>' +
          '<a>See More</a>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Cancel it!',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.apiRequest.post(cancelUrl, { booking_id: id }).subscribe(
            (res) => {
              // console.log("Cancel Booking", res)
              if (res.responseCode == 200) {
                this.successAlert = true;
                this.alertMsg = res.msg;
                setTimeout(() => {
                  this.successAlert = false;
                  this.getRecentBooking(this.userData.userId);
                }, 3000);
              } else {
                // console.log('Error', res);
              }
            },
            (err) => {
              // console.log(err);
            }
          );
        }
      });
    }
  }
  showBookingFilter: boolean = false;
  bookingFilterDropdown() {
    this.showBookingFilter = !this.showBookingFilter;
  }
  agentCustomer(form: NgForm) {
    let data = Object.assign({}, form.value);
    this._apiRequest.bookingCustomerDetails(data).subscribe(
      (res) => {
        // console.log('agent', res);
        if (res.responseCode == 200) {
          window.location.reload();
          // this.recent_booking = [];
          this.getRecentBooking(this.userData.userId);
        } else {
          // console.log(res);
        }
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  userStatus: boolean = true;
  userActive: number = 0;
  user_status(event: any) {
    let status = event.target.value;
    if (status == true) {
      this.userStatus = false;
    } else if (status == false) {
      this.userStatus = true;
    }
  }
  customerdata: any = {};
  getUsername(index: any, event: any) {
    this.userActive = index;
    let data = event.target.value;
    this.myCustomersList.forEach((value: any) => {
      if (value.id == data) {
        this.customerdata = value;
      }
    });
  }

  // searchResults: any = [];
  // search(event: any) {
  //   var key = event.target.value;
  //   for (let i = 0; i < this.recent_booking.length; i++) {
  //     if (this.recent_booking[i].hotel_name.toLowerCase().includes(key.toLowerCase())) {
  //       this.searchResults.push(this.recent_booking[i]);
  //     }
  //   }
  // }
  responsiveFilter: boolean = false;
  showFilterSearch() {
    this.responsiveFilter = !this.responsiveFilter;
  }

  search_by_hotel_name(event: any) {
    let searchQuery = event.target.value;
    // console.log("Search key:", searchQuery)
    this.search(searchQuery);
  }
 testarray:any=[];
  search(value: string) {
    this.testarray = [];
    if (value != '') {
      // console.log ("this.recent_booking", this.recent_booking)
      this.shimmerLoad = true;
      this.recent_booking.filter((val: any) => {
        var test_val=val['hotel_name']
        .toLocaleLowerCase()
        .includes(value.toLocaleLowerCase());
          if (test_val===true){
            this.testarray.push(val);
           
          }
      });
      this.myBookingList = this.testarray;
      this.bookinglisted = this.myBookingList;
      // console.log("search results:", this.testarray);
      // console.log("results:", this.myBookingList);
      this.shimmerLoad = false;
    }
     else {
      this.myBookingList=[];
      // console.log("this.myBookingList",this.myBookingList);
      this.getRecentBooking(this.userData.userId);
    }
  }
  onHotelDetails(id: string) {
    this._apiRequest.get_hotel_by_hotelId(id).subscribe(
      (res) => {
        if (res.responseCode == 200) {
          this._apiRequest.setHotelBooking(res.data.city);
        }
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  images: any = [];
  total: number = 0;
  percentage: any = 0;
  getUserIssues(form: NgForm) {
    let data = Object.assign({}, form.value);
    // if(this.selectedFirstImage){
    //   this.images[0] = this.selectedFirstImage;
    // }
    // if(this.selectedSecondImage){
    //   this.images[1] = this.selectedSecondImage;
    // }
    // if(this.selectedThirdImage){
    //   this.images[2] = this.selectedThirdImage;
    // }
    let formData: FormData = new FormData();
    let subject;
    if (data.reason == 'other') {
      subject = data.otherreason;
    } else {
      subject = data.reason;
    }
    formData.append('hotel_id', data.hotelId);
    formData.append('booking_id', data.bookingId);
    formData.append('userId', this.userData.userId);
    formData.append(
      'username',
      this.userData.firstname + '' + this.userData.lastname
    );
    formData.append('useremail', this.userData.email);
    formData.append('usercontact', this.userData.mobile);
    formData.append('description', data.description);
    formData.append('subject', subject);
    if (this.selectedFirstImage) {
      formData.append('image1', this.selectedFirstImage);
    }
    if (this.selectedSecondImage) {
      formData.append('image1', this.selectedSecondImage);
    }
    if (this.selectedThirdImage) {
      formData.append('image1', this.selectedThirdImage);
    }
    let apiURL = `/raise-hotel-complaint`;

    this._apiRequest.upload(formData).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.total = event.total;
          }
          this.percentage = Math.round((event.loaded / this.total) * 100);
        } else if (event instanceof HttpResponse) {
          this.is_opnIssueModal = false;
          this.ImgSrc =
            'assets/images/placeholders/default-placeholder-image.png';
          this.secondImgSrc =
            'assets/images/placeholders/default-placeholder-image.png';
          this.thirdImgSrc =
            'assets/images/placeholders/default-placeholder-image.png';
          this.successAlert = true;
          this.alertMsg = event.body.msg;
          setTimeout(() => {
            this.getRecentBooking(this.userData.userId);
            form.reset();
            this.percentage = 0;
            this.successAlert = false;
            this.alertMsg = '';
          }, 3000);
        }
        // console.log("Upload Image", event);
      },
      (err) => {
        // console.log(err);
      }
    );
    // this.apiRequest.post(apiURL, formData).subscribe(
    //   res => {
    //     console.log(res);
    //     if (res.responseCode == 200) {
    //       this.successAlert = true;
    //       this.alertMsg = res.msg;
    //       setTimeout(() => {
    //         this.successAlert = false;
    //       }, 3000);
    //       // form.reset();
    //     } else {
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    // console.log('Issues', this.images);
  }
  // max_error_all_img: string = "";
  // MultiImgSrc: string = "assets/images/placeholders/default-placeholder-image.png";
  // selectedAllImage: any;
  // getHotelImage(event: any) {
  //   if (event.target.files) {
  //     if (event.target.files[0]) {
  //       if (event.target.files[0].size < 200000) {
  //         const reader = new FileReader();
  //         reader.onload = (e: any) => this.ImgSrc = e.target.result;
  //         reader.readAsDataURL(event.target.files[0]);
  //         this.selectedFirstImage = event.target.files[0];
  //         this.max_error_first_img = "";
  //         this.images.push(event.target.files[0]);
  //       } else {
  //         this.max_error_first_img = "Max file upload size to 200KB";
  //         // this.ImgSrc = 'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
  //         this.selectedFirstImage = null;
  //       }

  //     }
  //     if (event.target.files[1]) {
  //       if (event.target.files[1].size < 200000) {
  //         const reader = new FileReader();
  //         reader.onload = (e: any) => this.secondImgSrc = e.target.result;
  //         reader.readAsDataURL(event.target.files[1]);
  //         this.selectedSecondImage = event.target.files[1];
  //         this.max_error_second_img = "";
  //         this.images.push(event.target.files[1]);
  //       } else {
  //         this.max_error_second_img = "Max file upload size to 200KB";
  //         // this.MultiImgSrc = 'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
  //         this.selectedSecondImage = null;
  //       }

  //     }
  //     if (event.target.files[2]) {
  //       if (event.target.files[2].size < 200000) {
  //         const reader = new FileReader();
  //         reader.onload = (e: any) => this.thirdImgSrc = e.target.result;
  //         reader.readAsDataURL(event.target.files[2]);
  //         this.selectedThirdImage = event.target.files[2];
  //         this.max_error_third_img = "";
  //         this.images.push(event.target.files[2]);
  //       } else {
  //         this.max_error_third_img = "Max file upload size to 200KB";
  //         // this.thirdImgSrc = 'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
  //         this.selectedThirdImage = null;
  //       }

  //     }

  //     console.log("Multi Images", this.images);
  //   }
  //   else {
  //     this.MultiImgSrc = 'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
  //     this.selectedAllImage = null;
  //     this.images = [];
  //   }
  // }
  max_error_first_img: string = '';
  ImgSrc: string = 'assets/images/placeholders/default-placeholder-image.png';
  secondImgSrc: string =
    'assets/images/placeholders/default-placeholder-image.png';
  thirdImgSrc: string =
    'assets/images/placeholders/default-placeholder-image.png';
  selectedFirstImage: any;
  max_error_second_img: string = '';
  selectedSecondImage: any;
  max_error_third_img: string = '';
  selectedThirdImage: any;
  getHotelFirstImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size < 200000) {
        const reader = new FileReader();
        reader.onload = (e: any) => (this.ImgSrc = e.target.result);
        reader.readAsDataURL(event.target.files[0]);
        this.selectedFirstImage = event.target.files[0];
        this.max_error_first_img = '';
      } else {
        this.max_error_first_img = 'Max file upload size to 200KB';
        this.ImgSrc =
          'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
        this.selectedFirstImage = null;
      }
    } else {
      this.ImgSrc =
        'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
      this.selectedFirstImage = null;
    }
  }

  getHotelSecondImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size < 200000) {
        const reader = new FileReader();
        reader.onload = (e: any) => (this.secondImgSrc = e.target.result);
        reader.readAsDataURL(event.target.files[0]);
        this.selectedSecondImage = event.target.files[0];
        this.max_error_second_img = '';
      } else {
        this.max_error_second_img = 'Max file upload size to 200KB';
        this.secondImgSrc =
          'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
        this.selectedSecondImage = null;
      }
    } else {
      this.secondImgSrc =
        'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
      this.selectedSecondImage = null;
    }
  }

  getHotelThirdImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size < 200000) {
        const reader = new FileReader();
        reader.onload = (e: any) => (this.thirdImgSrc = e.target.result);
        reader.readAsDataURL(event.target.files[0]);
        this.selectedThirdImage = event.target.files[0];
        this.max_error_third_img = '';
      } else {
        this.max_error_third_img = 'Max file upload size to 200KB';
        this.thirdImgSrc =
          'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
        this.selectedThirdImage = null;
      }
    } else {
      this.thirdImgSrc =
        'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
      this.selectedThirdImage = null;
    }
  }
  otherRsn: boolean = false;
  getOtherRsn(event: any) {
    if (event.target.value == 'other') {
      this.otherRsn = true;
    } else {
      this.otherRsn = false;
    }
  }

  reason = [
    {
      text: 'Bad Customer Service',
    },
    {
      text: 'Rude staff',
    },
    {
      text: 'Noisy neighbors',
    },
    {
      text: 'Low quality food',
    },
    {
      text: 'Unexpected fees',
    },
    {
      text: 'Reality is not the same as the promotion on social media or websites',
    },
    {
      text: 'Restricted hotel rules',
    },
    {
      text: 'Lack of cleanliness (Dirty room)',
    },
    {
      text: 'Small or uncomfortable beds',
    },
  ];
}

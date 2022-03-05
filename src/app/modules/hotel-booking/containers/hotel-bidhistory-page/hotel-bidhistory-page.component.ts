import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { CommonService } from 'src/app/modules/core/services/common.service';
import { PaymentsService } from 'src/app/modules/core/services/payments.service';
import Swal from 'sweetalert2';
// declare var Razorpay: any;
// import { Razorpay } from 'razorpay';

declare let Razorpay: any;

@Component({
  selector: 'app-hotel-bidhistory-page',
  templateUrl: './hotel-bidhistory-page.component.html',
  styleUrls: ['./hotel-bidhistory-page.component.scss']
})
export class HotelBidhistoryPageComponent implements OnInit {
  searchQuery: any;
  user_data: any;
  user_all_data: any = {};
  recent_bidding: any = [];
  addon_list: any = {};
  myBidHistoryList: any = [];
  bid_status: string = 'All'
  bid_name_status: string = 'All Biddings';
  addon_selected_list: any = [];
  addons: any = {};
  payment_data: any = {};
  a: any = [];
  bid_price: number = 0;
  gst_per: number = 0;
  addon_all_price: any = [];
  addon_price: number = 0;
  addon_id: any = [];
  math: any = Math;
  filter_data: any = [];
  apiBaseURL: string = "";
  userData: any = {};
  filter_bidding: any = [];
  key: string = '';
  paymentsData: any



  constructor(
    // private route: ActivatedRoute,
    private apiRequest: ApiService,
    private _apiRequest: ApiRequestService,
    public router: Router,
    public _common: CommonService,
    public payment_service: PaymentsService,
  ) {

  }

  ngOnInit(): void {

    let amt = this.payment_service.get_Calculated_Amount(1100, 2, 3, 2);
    //console.log("Calculated amt:", amt);



    this.apiBaseURL = this.apiRequest.serviceurl;
    this.key = this.apiRequest.rzrpayKey;
    this.userData = this._common.getLogedinUserData();
    this.getRecentBidding(this.userData.userId);
    interval(200000000).subscribe(val => this.getRecentBidding(this.userData.userId));

    // console.log("Razor pay key:", this.key);

  }
  shimmerLoad: boolean = true;
  getRecentBidding(uid: any) {
    // this._common.is_app_loading=true;
    // let apiURL = "/get-user-bids";
    let filterData: any = [];
    this._apiRequest.getMyBidings(uid).subscribe(
      res => {
        if (res.responseCode == 200) {
          //console.log("res", res);
          this.recent_bidding = res.data;
          this.filter_bidding = res.data;
          // this._common.is_app_loading=false;
          this.shimmerLoad = false;
        } else {
      //    console.log(res);
          this.shimmerLoad = false;
        }
      }, err => {
     //   console.log(err);
        this.shimmerLoad = false;
      }
    );
  }
  options = {
    "key": this.key, //rzp_test_K9YIjvN8gPZkC2 Enter the Key ID generated from the Dashboard
    "amount": "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "",
    "name": "",
    "description": "Pay to hotel",
    "image": "",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": (response: any) => {
      // return response
      this.razorpayHandler(response);
      // alert('Payment Id '+response.razorpay_payment_id);
      // alert('Order Id '+response.razorpay_order_id);
      // alert('Signature '+response.razorpay_signature);
    },
    "modal": {
      "ondismiss": () => {
        window.location.reload();
      }
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#e21224"
    }
  };

  obj = {
    name: this.userData.firstname + this.userData.lastname,
    email: this.userData.email,
    mobile: this.userData.mobile,
    bidId: '',
    amount: 0,
    hotel_id: '',
    hotel_name: ''
  }
  info = {
    bid_id: '',
    taxClass: 0,
    add_on: this.addon_id
  }

  orderByRzrPay: any;

  bookingPayment(id: string, price: number, gst: number, hotel_id: string, hotel_name: string) {
    let bll_amt = Number(price.toFixed(2));
   
    if (this.userData.mobile.length != 10) {
      this.cartModal = false;
      Swal.fire({
        html: '<h2>' + 'please provide a valid phone number' + '</h2>',
        imageUrl: '../../../../../assets/images/number snapshot remark.JPG',
        text: 'Bidding Page/Profile',
        showConfirmButton:false,
        timer:5000
      })
      return
    }
      let orderData = {
        firstname: this.userData.firstname.trim(),
        lastname: this.userData.lastname.trim(),
        email: this.userData.email.trim(),
        mobile: this.userData.mobile,
        hotel_id: hotel_id,
        hotel_name: hotel_name.trim(),
        bid_id: id,
        taxClass: gst,
        amount: bll_amt * 100,
        add_on: this.addon_id ? this.addon_id : []
      };
  //    console.log("Amt price: ", orderData)
   //   this._common.is_app_loading = true;
      this.generateOrderRZRPAY(orderData);
 

  }




  cartModal: boolean = false;
  hotelBooking(data: any) {
    this.cartModal = true;
    this.payment_data = data;
    // console.log("Bid Price", data)
    this.bid_price = data.price;
    let addon_url = `/get-hotel-addon`;
    this.apiRequest.post(addon_url, { hotel_id: data.hotel_id }).subscribe(
      res => {
        // console.log("Addon List", res)
        this.addon_list = [];
        if (res.responseCode == 200) {
          res.data.forEach((value: any) => {
            if (value.is_active == true) {
              this.addon_list.push(value);
            }
          });
        } else {
      //    console.log(res)
        }
      }, err => {
        // console.log(err)
      }
    );
    if (this.bid_price < 1000) {
      this.gst_per = 0
    }
    else if (this.bid_price >= 1000 && this.bid_price < 7500) {
      this.gst_per = 12
    }
    else {
      this.gst_per = 18
    }
  }
  successAlert: boolean = false;
  errorAlert: boolean = false;
  success_msg: string = '';
  error_msg: string = '';

  razorpayHandler(response: any) {
    if (this.orderByRzrPay) {

      //  bid_id?:string, hotel_id?:string, hotel_name?:string, amount?:number
      // console.log("response", response);

      let obj = {
        userId: this.userData.userId,
        bid_id: this.obj.bidId,
        hotel_id: this.obj.hotel_id,
        amount: this.obj.amount,
        username: this.obj.name,
        rzp_payment_id: response.razorpay_payment_id,
        rzp_order_id: this.orderByRzrPay.id,
        rzp_signature: response.rzp_signature,
        hotel_name: this.obj.hotel_name,
      }
      // rzp_order_id: response.razorpay_payment_id+this.obj.bidId,
      //  rzp_signature: this.obj.bidId+response.razorpay_payment_id,
      // rzp_order_id: response.rzp_order_id,
      // rzp_signature: response.rzp_signature,
      // console.log("respse", obj)
      let url = `/update-booking-info-by-bidid`;
      // console.log("addon", this.info)
      this.apiRequest.post(url, this.info).subscribe(res => { console.log("addon", res) });
      let paymentUrl = `/app-payment`;
      this.apiRequest.post(paymentUrl, obj).subscribe(res => {
        //   console.log("Payment respse", res);
        if (res.responseCode == 200) {
          this._common.is_app_loading = false;
          // this.successAlert = true;
          // this.success_msg = res.msg;
          // // console.log("alert respse", this.successAlert);
          // // console.log("alert respse", this.success_msg);
          setTimeout(() => {
            this.router.navigate(['/bookinghistory/booking']).then(() => {
              window.location.reload();
            });
          }, 1000);
        } else {
          this.errorAlert = true;
          this.error_msg = res.msg;
          this.cartModal = false;
          setTimeout(() => {
            this.errorAlert = false;
          }, 3000);
        }
      });

      // if (typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1) {
      //   window.location.reload();
      // } else {

      // }
    }
  }
  md5(value: any) {
    // return SHA256(value);
    return window.btoa(value)
  }

  closeModal() {
    this.cartModal = false;
  }
  getAddon(i: number, data: any,) {
    let id = data.id
    if (this.addon_list[i]) {
      this.a[i] = !this.a[i];
      if (this.a[i]) {
        this.addon_selected_list.push(this.addon_list[i]);
        this.addon_price = 0
      }
      else {
        const index = this.addon_selected_list.indexOf(this.addon_list[i]);
        if (index > -1) {
          this.addon_selected_list.splice(index, 1);
          this.addon_price = 0
        }
      }
    }
    // this.addon_all_price=this.addon_selected_list.price;
    this.addon_selected_list.forEach((value: any, index: number) => {
      this.addon_price += value.price;
      this.addon_id[index] = value.id

    });

  }
  showDescription: number = 0;
  openAccordion(i: number) {
    this.showDescription = i;
  }
  noRecentBidding: string = '';
  getBidsByStatus(status: string, name: string) {
    this.bid_status = status;
    this.bid_name_status = name;
    this.filter_bidding = [];
    this.recent_bidding.forEach((value: any) => {
      if (value.status == this.bid_status || this.bid_status == 'All') {
        this.noRecentBidding = '';
        this.filter_bidding.push(value);
      } else {
        this.noRecentBidding = 'No Bidding Available Of ' + this.bid_status;
      }
    });

  }
  showBidFilter: boolean = false;
  bidFilterDropdown() {
    this.showBidFilter = !this.showBidFilter;
  }
  onKey(event: any) {
    // let apiURL = "/get-user-bids";
    this._apiRequest.getMyBidings(this.searchQuery.userId).subscribe(
      res => {
        if (res.responseCode == 200) {
          this.recent_bidding = res.data;
          this.filter_bidding = [];
          let addon_url = `/get-hotel-addon`;
          this.apiRequest.post(addon_url, { hotel_id: this.recent_bidding.hotel_id }).subscribe(
            res => {
              if (res.responseCode == 200) {
                this.addon_list = res.data;
              }
            }, err => {
              // console.log(err)
            }
          )
          // recent_bidding
          res.data.forEach((hotelData: any) => {
            if (hotelData.hotel_name == event.target.value) {
              this._apiRequest.get_hotel_by_hotelId(hotelData.hotel_id).subscribe(
                res => {
                  if (res.responseCode == 200) {
                    this.filter_bidding.push(
                      {
                        hotel_img: res.data.image,
                        ...hotelData
                      }
                    );
                  } else {
               //     console.log(res)
                  }
                }, err => {
                  // console.log(err)
                }
              );
            }
          });
        } else {
      //    console.log(res)
        }
      }, err => {
        // console.log(err)
      }
    )
  }

  search_by_hotel_name(event: any) {
    let searchQuery = event.target.value;
    this.search(searchQuery);
  }

  search(value: string) {
    if (value != '') {
      this.shimmerLoad = true;
      this.filter_bidding = this.filter_bidding.filter(
        (val: any) => val['hotel_name'].toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
      this.filter_bidding = this.filter_bidding;
      this.shimmerLoad = false;
    } else {
      this.getRecentBidding(this.userData.userId);
    }
  }
  onHotelDetails(id: string) {
    this._apiRequest.get_hotel_by_hotelId(id).subscribe(
      res => {
        if (res.responseCode == 200) {
          this._apiRequest.setHotelBooking(res.data.city);
        } else {
        //  console.log("bid", res)
        }
      }, err => {
        // console.log(err)
      }
    );

  }

  responsiveFilter: boolean = false;
  showFilterSearch() {
    this.responsiveFilter = !this.responsiveFilter;
  }


  convertDate(createdAt: string) {
    return new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear() === new Date(createdAt).getDate() + '-' + (new Date(createdAt).getMonth() + 1) + '-' + new Date(createdAt).getFullYear();
  }



  // Re dev-----------------------------------------------------------------
  generateOrderRZRPAY(data: any) {
    this._common.is_app_loading = true;
   // console.log("------------------Order payload -------------: ", data);
    let apiURL = `/generate-order-rzp`
    let payload = {
      "bid_id": data.bid_id,
      "amount": data.amount
    }
    this.apiRequest.post(apiURL, payload).subscribe(res => {
      if (res.responseCode === 200 && res.response) {
      //  console.log("------------Order Res ---------------: ", res);
        this.handelRazorPayModal({ ...data, orderData: res.response });
      }else{
        alert("Somthing want wrong.")
      }
      this._common.is_app_loading = false;
    });
    this.cartModal = false;
  
  }

  payForJusbid(data: any, paymentData: any) {
    let apiURL = "/app-payment";

    let payLoad = {
      "userId": this.userData.userId,
      "bid_id": data.bid_id,
      "hotel_id": data.hotel_id,
      "amount": data.amount,
      "username": data.firstname + data.lastname,
      "hotel_name": data.hotel_name,
      "rzp_payment_id": paymentData.razorpay_payment_id,
      "rzp_order_id": paymentData.razorpay_order_id,
      "rzp_signature": paymentData.razorpay_signature,
      "rzp_payment_status": "",
      "payment_via": "Web",
    };

 //   console.log("Pay for jusbid payLoad : ", payLoad);

    this.apiRequest.post(apiURL, payLoad).subscribe(res => {
    //  console.log("app-payment RES", res);
      this.router.navigateByUrl('/bookinghistory/booking');
    });

  }


  userId: string = '';

  handelRazorPayModal(data: any) {
    this.paymentsData = data;
    let that = this;
    let RAZORPAY_OPTIONS = {
      "key": this.apiRequest.rzrpayKey, // Enter the Key ID generated from the Dashboard    
      "amount": data.orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise    
      "currency": "INR",
      "name": this.apiRequest.companyName,
      "description": "Pay via Jusbid",
      "image": "https://www.jusbid.in/assets/icons/icon-128x128.png",
      "order_id": data.orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1    
      "handler": function (response: any) {
        console.log("-------------payment details-----------");
      //  console.log("razorpay_payment_id", response.razorpay_payment_id);
      //  console.log("razorpay_order_id", response.razorpay_order_id);
      //  console.log("razorpay_signature", response.razorpay_signature);
        that.payForJusbid(data, response);
      },
      "prefill": {
        "name": data.firstname + ' ' + data.lastname,
        "email": data.email,
        "contact": data.mobile
      },
      "notes": {
        "address": "4-C, 1st Floor, Hotel Udaivillas Road, Haridas Ji Ki Magri, Udaipur, Rajasthan 313004"
      },
      "theme": {
        "color": "#e21224"
      }
    };

    let rzp1 = new Razorpay(RAZORPAY_OPTIONS);

    rzp1.on('payment.failed', function (response: any) {
    //  console.log(response.error.code);
    //  console.log(response.error.description);
    //  console.log(response.error.source);
    //  console.log(response.error.step);
    //  console.log(response.error.reason);
    //  console.log(response.error.metadata.order_id);
    //  console.log(response.error.metadata.payment_id);
    });

    rzp1.open();

  }


}
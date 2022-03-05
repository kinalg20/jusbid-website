import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiRequestService } from './api-requests.service';
import { ApiService } from './api.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private rzrpayKey = environment.rzrpayKey;
  private companyOfficeAddress = environment.companyOfficeAddress;

  customerInfo: any = {};
  userData: any = {};
  options: any = {
    key: this.rzrpayKey, //rzp_test_K9YIjvN8gPZkC2 Enter the Key ID generated from the Dashboard
    amount: "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "",
    name: "",
    description: "Pay to hotel",
    image: "",
    order_id: "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: (response: any) => {
      this.razorpayHandler(response);
    },
    modal: {
      ondismiss: () => {
        window.location.reload();
      }
    },
    customer: {
      name: "",
      email: "",
      contact: ""
    },
    notes: {
      address: this.companyOfficeAddress
    },
    theme: {
      color: "#e21224"
    }
  };

  constructor(private apiRequest: ApiService, public _common: CommonService, private _apiRequest: ApiRequestService) {
    this.userData = this._common.getLogedinUserData();
  }


  createRazorPayOrder(id: string, price: number, gst: number, hotel_id: string, hotel_name: string) {

    let apiURL = `/generate-order-rzp`;

    this.customerInfo = {
      name: this.userData.firstname + this.userData.lastname,
      email: this.userData.email,
      mobile: this.userData.mobile,
      bidId: id,
      amount: price,
      hotel_id: hotel_id,
      hotel_name: hotel_name
    };

    let orderData = {
      bid_id: id,
      amount: price * 100,
    };

    this.apiRequest.post(apiURL, orderData).subscribe(
      res => {
        if (res.responseCode == 200) {
          console.log("Razor Pay response: ", res)
          this.options.amount = res.response.amount;
          this.options.currency = res.response.currency;
          this.options.name = this.userData.firstname + ' ' + this.userData.lastname;
          // this.options.order_id = res.response.id;
          this.options.customer.name = this.userData.firstname + ' ' + this.userData.lastname;
          this.options.customer.email = this.userData.email;
          this.options.customer.contact = this.userData.mobile;
          this.options.key = this.rzrpayKey;
          this.options.image = "https://www.jusbid.in/home/live/assets/images/logos/Jusbid_logo.png";
          const instance = new this._apiRequest.nativeWindow.Razorpay(this.options);
          instance.open();
          instance.on('payment.failed', (response: any) => {
            let error = response.error.description;
            console.log("Razor Pay error: ", error)
          });
          // const instance = new Razorpay(
          //   {
          //     key_id: 'rzp_test_SF1Xn1tfhexJK5',
          //     key_secret: '71AyCxhqqE0dqgjsInHNxkFu',
          //   }
          // );
          // console.log("Loader", this._common.is_app_loading);
        } else {
          let error = res.error.description;
          console.log("Razor Pay error: ", error)
        }
      }, err => {
        console.log(err);
      }
    )

    // // this.router.navigate([payment_gatway_url]);
    // let payment_gatway_url = this.apiRequest.serviceurl + `/pay-now/${obj.name}/${obj.email}/${obj.mobile}/${obj.amount}/${obj.bidId}`;
    // window.location.href = payment_gatway_url;
  }


  payOnFlightBooking() {

  }


  razorpayHandler(response: any) {
    let paymentURL = `/app-payment`;
    // console.log("response", response);
    if (typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1) {
      window.location.reload();
    } else {
      let obj = {
        userId: this.userData.userId,
        rzp_payment_id: response.razorpay_payment_id,
        rzp_order_id: response.razorpay_payment_id,
        rzp_signature: response.razorpay_payment_id,
      }
      // rzp_order_id: response.razorpay_payment_id+this.obj.bidId,
      //  rzp_signature: this.obj.bidId+response.razorpay_payment_id,
      // rzp_order_id: response.rzp_order_id,
      // rzp_signature: response.rzp_signature,
      // console.log("respse", obj)

      this.apiRequest.post(paymentURL, obj).subscribe(
        res => {
          console.log("Payment resposne:", res);
          if (res.responseCode == 200) {
          }
        }, err => {
          console.log(err)
        }
      )
    }
  }

  generate_md5(value: any) {
    // return SHA256(value);
    return window.btoa(value)
  }

  // Jusbid Tax Details
  // Amt = 0-999 => GST: 0% and Service Fee: 6%
  // Amt = 1000-7499 => GST: 12% and Service Fee: 6%
  // Amt = 7500-Above => GST: 18% and Service Fee: 0%

  gst_amount: any = 0;
  Service_Fee_amount: any = 0;
  gst_percentage: number = 0;
  service_percentage: number = 0;
  C_GST_Charge: any = 0;
  S_GST_Charge: any = 0;
  get_Calculated_Amount(bidPrice: any, roomQTY: any, GUESTS: any, days: any) {
    let GST: any = [0, 12, 18];
    let Service_Fee: any = [0, 6];
    let GST_Charge: any = {
      CGST: 9,
      SGST: 9
    };

    let room_price: any = bidPrice;
    let room_qty: any = roomQTY;
    let no_of_GUESTS: any = GUESTS;

    if (room_price >= 0 && room_price <= 999) {
      this.gst_amount = 0;
      this.Service_Fee_amount = Service_Fee[1] * room_price / 100;
      this.gst_percentage = GST[0];
      this.service_percentage = Service_Fee[1];

      this.C_GST_Charge = GST_Charge['CGST'] * this.Service_Fee_amount / 100;
      this.S_GST_Charge = GST_Charge['SGST'] * this.Service_Fee_amount / 100;

    } else if (room_price >= 1000 && room_price <= 7499) {
      this.gst_amount = GST[1] * room_price / 100;
      this.Service_Fee_amount = Service_Fee[1] * room_price / 100;
      this.gst_percentage = GST[1];
      this.service_percentage = Service_Fee[1];

      this.C_GST_Charge = GST_Charge['CGST'] * this.Service_Fee_amount / 100;
      this.S_GST_Charge = GST_Charge['SGST'] * this.Service_Fee_amount / 100;

    } else {
      this.gst_amount = GST[2] * room_price / 100;
      this.Service_Fee_amount = 0;
      this.gst_percentage = GST[2];
      this.service_percentage = this.Service_Fee_amount;

      this.C_GST_Charge = 0;
      this.S_GST_Charge = 0;

    }

    return {
      room_price: room_price,
      room_qty: room_qty,
      GST_Amt: this.gst_amount,
      guests: no_of_GUESTS,
      GST_percentage: this.gst_percentage,
      service_percentage: this.service_percentage,
      Service_Fee: this.Service_Fee_amount,
      subTotal: room_price + this.gst_amount,
      CGST: this.C_GST_Charge,
      SGST: this.S_GST_Charge,
      GST_Charge: GST_Charge,
      total: this.gst_amount + room_price + this.Service_Fee_amount
    };
  }




}

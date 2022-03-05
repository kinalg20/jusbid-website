import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { CommonService } from 'src/app/modules/core/services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  userId: string = '';
  user_all_data: any = {};
  userSysId: any;
  userProfileImg: string = '';
  // isLoadedPage: boolean = false;
  myCustomersList: any = [];
  stateList: any = [];
  cities_list: any = [];
  constructor(
    public api: ApiRequestService,
    public common: CommonService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.api.getUserId();
    this.getUserProfile(this.userId);
    this.getMycustomers(this.userId);
    this.api.getStates().subscribe(res => {
      this.stateList = res.data;
    })
  }

  getMycustomers(uid: string) {
    this.api.getMyTravelAgentsCustomers(uid).subscribe(
      res => {
        if (res.responseCode == 200) {
          this.myCustomersList = res.data;
        } else {
          this.myCustomersList = [];
        }
      }
    );
  }

  removeMyCustomerFromList(id: string) {
    if (confirm("Are you sure to remove his user?")) {
      this.common.is_app_loading = true;
      this.api.removeMyTravelAgentsCustomers(id).subscribe(
        res => {
          this.common.is_app_loading = false;
          this.getMycustomers(this.userId);
        }
      );
    }
  }

  is_openAddTravelAgentsCutsomerModal: boolean = false;
  openAddTravelAgentsCutsomerModal() {
    this.is_openAddTravelAgentsCutsomerModal = !this.is_openAddTravelAgentsCutsomerModal;
  }
  addTravelAgentCustomer(form: NgForm) {
    this.common.is_app_loading = true;
    let data = Object.assign({}, form.value);
    let params = {
      userId: this.userId,
      name: data.name,
      email: data.email,
      contact: data.contact,
      address: data.address
    }
    this.api.createMyTravelAgentsCustomers(params).subscribe(
      res => {
      //  console.log(res);
        this.common.is_app_loading = false;
        this.is_openAddTravelAgentsCutsomerModal = false;
        this.getMycustomers(this.userId);
      }
    );
  }


  editCustomerDetailsObj: any = {}
  is_openEditTravelAgentsCutsomerModal: boolean = false;
  openEditTravelAgentsCutsomerModal(customeObj?: any) {
    this.editCustomerDetailsObj = customeObj;
    this.is_openEditTravelAgentsCutsomerModal = !this.is_openEditTravelAgentsCutsomerModal;
  }
  editTravelAgentCustomer(form: NgForm) {
    let data = Object.assign({}, form.value);
    let params = {
      userId: this.userId,
      name: data.name,
      email: data.email,
      contact: data.contact,
      address: data.address,
      customer_id: this.editCustomerDetailsObj.id
    }
    this.api.editMyTravelAgentsCustomers(params).subscribe(
      res => {
        this.is_openEditTravelAgentsCutsomerModal = false;
        this.getMycustomers(this.userId);
       // console.log("res", res)
      }
    );
  }
  shimmerLoad: boolean = true;
  getUserProfile(userId: string) {
    if (userId) {
      this.api.getUserInformationsByUid(userId).subscribe(
        res => {
          if (res.responseCode == 200) {
            this.userSysId = res.data.id;
            this.user_all_data = { gender: res.data.gender == '' ? "Male" : res.data.gender, ...res.data };
            this.userProfileImg = this.user_all_data.profile_img;
            if (this.cities_list.length == 0) {
              this.cities_list.push(this.user_all_data.city);
            }
            this.shimmerLoad = false;
          }
        }
      );
    }
  }

  profileImgEditResMsg: string = "";
  updateProfielImg(event: any) {
    let formData: FormData = new FormData();
    formData.append('userId', this.userId);
    formData.append('profile_img', event.target.files[0]);
    this.api.saveUserProfileImg(formData).subscribe(
      res => {
        if (res.responseCode == 200) {
          this.profileImgEditResMsg = res.msg;
          setTimeout(() => {
            this.getUserProfile(this.userId);
            this.profileImgEditResMsg = '';
          }, 5000);
        } else {
          setTimeout(() => {
            this.profileImgEditResMsg = '';
          }, 5000);
          this.profileImgEditResMsg = res.msg;
        }
      },
    );
  }

  changeUserPassword(form: NgForm) {
    let data = Object.assign({}, form.value);
    let params = {
      current_password: data.current_password,
      new_password: data.new_password,
      userId: this.userId
    }

    this.api.resetPassword(params).subscribe(
      res => {
        this.user_all_data = res.data;
        this.profileEditResMsg = res.msg;
        this.router.navigateByUrl('/auth')
      }
    );
  }

  is_openChangePasswordModal: boolean = false;
  openChangePasswordModal() {
    this.is_openChangePasswordModal = !this.is_openChangePasswordModal;
  }

  userGender: string = "Male";
  getGender(gender: string) {
    this.userGender = gender;
  }

  profileEditResMsg: string = "";
  editProfile(form: NgForm) {
    let data = Object.assign({}, form.value);
    let params = {
      userId: this.userId,
      id: this.userSysId,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      mobile: data.mobile,
      state: data.state,
      city: data.city,
      password: data.password,
      gender: this.userGender,
      dob: data.dob,
      role: 6,
    }
    this.api.updateUser(params).subscribe(
      res => {
    //    console.log("profile res", res)
        if (res.responseCode == 200) {
          this.user_all_data = res.data;
          this.profileEditResMsg = res.msg;
          this.is_editProfileDetails = false;
          setTimeout(() => {
            this.profileEditResMsg = '';
          }, 5000);
        } else {
          setTimeout(() => {
            this.profileEditResMsg = '';
          }, 5000);
          this.profileEditResMsg = res.msg;
        }
      }
    );
  }

  is_password_show: boolean = false;
  ShowPassword() {
    this.is_password_show = !this.is_password_show;
  }

  logout() {
    this.common.logOut();
  }

  is_editProfileDetails: boolean = false;
  editProfileDetails() {
    this.is_editProfileDetails = !this.is_editProfileDetails;
  }
  getStateCode(event: any) {
    let stateCode = event.target.value;
    let state_code = "";
    this.stateList.forEach((value: any) => {
      if (value.name == stateCode) {
        state_code = value.code;
      }
    });
    this.api.getCities().subscribe(res => {
      this.cities_list = res.data[state_code];
    })
  }


  invalidMobile : boolean = false;

  inputMobile(event: any) {
    if (
      event.key.length === 1 &&
      !/^[0-9]$/.test(event.key)
    ) {
      event.preventDefault();
    }
  }

  validateMobile(event: any) {
    const value = event.target.value;

    if (
      value &&
      /^[0-9]+$/.test(value) &&
      value.length < 10
    ) {
      this.invalidMobile = true;
    }

    else {
      this.invalidMobile = false;
    }
  }
}

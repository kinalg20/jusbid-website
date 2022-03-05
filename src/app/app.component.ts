import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { fromEvent, interval, merge, Observable, Observer, of } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { ApiRequestService } from './modules/core/services/api-requests.service';
import { CommonService } from './modules/core/services/common.service';
import { SEOService } from './modules/core/services/seo.service';
// import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'jusbid';
  userData: any = {};
  notifications: any = [];
  latestNotifications: any = [];

  previousCountNotification: number = 0;
  latestCountNotification: number = 0;
  previousbdmCountNotification: number = 0;
  latestbdmCountNotification: number = 0;
  newNotification: boolean = false;
  loading_effect: boolean = false;
  online$!: Observable<boolean>;
  no_internet_connection: boolean = true;

  constructor(
    private router: Router,
    public common: CommonService,
    private activatedRoute: ActivatedRoute,
    private _seoService: SEOService,
    private _apiRequest: ApiRequestService,
  ) { }

  onActivate(e: any) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 2);
  }

  ngOnInit() {

    const hostName = "https://www.jusbid.in"

    // Meta Tags
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((event) => {
      this._seoService.updateTitle(`Jusbid: ${event['title']}`);
      this._seoService.updateOgTitle(event['ogTitle']);
      this._seoService.updateOgImage(event['ogImage']);
      this._seoService.updateOgLocale(event['ogLocale']);
      this._seoService.updateOgDescription(event['ogDescription']);
      this._seoService.updateOgSiteName(event['ogSiteName']);
      this._seoService.updateOgUrl(hostName + event['ogUrl']);
      this._seoService.updateOgType(event['ogType']);
      //Updating Description tag dynamically with title
      this._seoService.updateDescription(event['description']);

      //Set Canonical URL
      if (event.canonical) {
        this._seoService.updateCanonicalUrl(hostName + event.canonical);
      } else {
        this._seoService.updateCanonicalUrl(hostName + this.router.url);
      }
      //You can set the Meta & Title here

    });








    this.loading_effect = true;
    interval(1000).subscribe(n => {
      this.setTimer();
    });
    // if (window.navigator.onLine) {
    //   this.no_internet_connection = false;
    // } else {
    //   this.no_internet_connection = true;
    // }
    // console.log("Error", this.common.error_msg);
    // this.online$ = merge(
    //   of(navigator.onLine),
    //   fromEvent(window, 'online').pipe(mapTo(true)),
    //   fromEvent(window, 'offline').pipe(mapTo(false))
    // )
    // this.networkStatus();
    // AOS.init();
    // window.onload = () => {
    //   this.loading_effect = false;
    // }
    this.createOnline$().subscribe(isOnline => this.no_internet_connection = isOnline);
    // console.log("Error", this.common.error_msg);
    this.userData = this.common.getLogedinUserData();
    // this._apiRequest.getUserNotification(this.userData.userId).subscribe(res => {
    //   // console.log("Notification", res);
    //   if(res.responseCode == 200){
    //     this.notifications = res.data;
    //   }
    // });
    // this.getUserNotifications()
    interval(43000).subscribe(val => this.getUserNotifications());
    this.loading_effect = false;
  }
  // public networkStatus() {
  //   this.online$.subscribe(value => {
  //     this.no_internet_connection =  value;
  //   })
  // }
  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
  reLoadWindow() {
    window.location.reload();
  }
  notificationActive: boolean = false;
  showNotification() {
    this.notificationActive = !this.notificationActive;
  }
  getUserNotifications() {
    this._apiRequest.getUserNotification(this.userData.userId).pipe(
      tap(
        res => {
          if (res.responseCode == 200) {
            this.latestCountNotification = res.data.length;
          }
        }
      ),
    ).subscribe(res => {
      // console.log("UserId", res)
      // console.log("Notification Data", res);
      if (res.responseCode == 200) {
        this.notifications = res.data;
        if (this.latestCountNotification > this.previousCountNotification && this.previousCountNotification != 0) {
          // this.latestNotifications = res.data.slice(this.previousCountNotification, this.latestCountNotification);
          this.newNotification = true;
          setTimeout(() => {
            this.newNotification = false;
          }, 10000);
        }
        this.previousCountNotification = res.data.length;
      }
    });
    // return this.http.post<any>(apiURL, data);

  }



  // Jusbid Timer

  Days: any;
  Hours: any;
  Minutes: any;
  Seconds: any;
  is_EXPIRED: boolean = true;

  setTimer() {
    // Set the date we're counting down to

    // sham 8.30


    var countDownDate = new Date("Oct 15, 2021 20:30:00").getTime();



    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    this.Days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.Hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.Minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.Seconds = Math.floor((distance % (1000 * 60)) / 1000);


    // If the count down is over, write some text 
    if (distance < 0) {
      this.is_EXPIRED = true;;
    }

  }

}

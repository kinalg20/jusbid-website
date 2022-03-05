import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  minDate = new Date();
  footerList = [
    {
      header: "Product Offerings",
      list: [
        {
          name: "Flight",
          link: "/flights-search/flightSoon",
          is_cutom_link: false
        },
        {
          name: "Best Hotel Room Deals",
          link: "/Best-hotel-room-deals",
          is_cutom_link: false
        },
      ]
    },
    {
      header: "JUSBID",
      list: [
        {
          name: "Careers",
          function: () => { },
          link: "/career",
          is_cutom_link: false
        },
        {
          name: "JusBid Blog",
          function: () => { },
          link: "/blogs",
          is_cutom_link: false
        },
        {
          name: "Guide",
          function: () => { },
          link: "/guide",
          is_cutom_link: false
        },

      ]
    },
    {
      header: "ABOUT THE SITE",
      list: [
        {
          name: "Contact Us",
          function: () => { },
          link: "/contact-us",
          is_cutom_link: false
        },
        {
          name: "Payment Security",
          function: () => { },
          link: "/Payment-security",
          is_cutom_link: false
        },
        {
          name: "Privacy Policy",
          function: () => { },
          link: "/privacy-policy",
          is_cutom_link: false
        },
        {
          name: "User Agreement",
          function: () => { },
          link: "/user-agreement",
          is_cutom_link: false
        },
        {
          name: "Terms and Conditions",
          function: () => { },
          link: "/terms-and-condition",
          is_cutom_link: false
        },
        
        {
          name: "Travel Agent Agreement",
          function: () => { },
          link: "/travel-agent-agreement",
          is_cutom_link: false
        },
        {
          name: "FAQ'S",
          function: () => { },
          link: "/faqs",
          is_cutom_link: false
        },
      ]
    },
    {
      header: "Become a Partner ",
      list: [
        {
          name: "List your Hotels",
          link: "/register-your-hotel",
          is_cutom_link: false
        },
        {
          name: "Become a Travel Agent",
          link: "/become-travel-agent",
          is_cutom_link: false
        },
        {
          name: "Business Partner Agreement",

          link: "/business-partner-agreement",
          is_cutom_link: false
        },
      ]
    },
    


  ];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  title = 'career-p';
  Isshowmodel: boolean = false;
  Isshowmodel1: boolean = false;
  Isshowmodel2: boolean = false;
  showmodel: boolean = true;
  showmodel1: boolean = false;
  showmodel2: boolean = false;
  showmodel3: boolean = false;
  data: any;
  object: string[] = [];
  skill: string[] = [];
  object1: string[] = [];
  skill1: string[] = [];
  object2: string[] = [];
  applyfunc(string: any) {
    this.Isshowmodel = !this.Isshowmodel
    this.object = [];
    this.skill = [];
    if (string == 'FAD') {
      this.data = 'Front End Developer:';
      this.object.push('• Prioritizing user experience', '•	Bringing a concept to life with HTML, CSS, and JavaScript', '•	Production and maintenance of websites and web application user interfaces',
        '• Creating tools that enhance interaction with the site in any browser', '•	Implementing design for mobile sites', '• Maintaining software workflow management', '•	Looking at SEO best practices',
        '• Testing the site for usability and fixing any bugs', '•	Determining the structure and design of  web pages.', '•	Ensuring user experience determines design choices', '•	Developing features to enhance the user experience.',
        '•	Striking a balance between functional and aesthetic design.', '•	Ensuring web design is optimized for smart phones.', '•	Building reusable code for future use.', '•	Optimizing web pages for maximum speed and scalability.',
        '•	Utilizing a variety of markup languages to write web pages.', '•	Maintaining brand consistency throughout the design'
      );
      this.skill.push('• HTML', '• CSS', '• Java Script', '•	Rest API Integration')

    }
    else if (string == 'FSD') {
      this.data = 'Full Stack Developer';
      this.object.push('•	Developing front end website architecture.', '•	Designing user interactions on web pages.', '•	Developing back-end website applications.', '•	Creating servers and databases for functionality',
        '•	Ensuring cross-platform optimization for mobile phones.', '•	Ensuring responsiveness of applications.', '•	Working alongside graphic designers for web design features.', '•	Seeing through a project from conception to finished product.',
        '•	Designing and developing APIs.', '•	Meeting both technical and consumer needs.', '•	Staying abreast of developments in web applications and programming languages.')
      this.skill.push('•	LAMP stack: JavaScript - Linux - Apache - MySQL - PHP', '•	LEMP stack: JavaScript - Linux - Nginx - MySQL - PHP', '• EAN stack: JavaScript - MongoDB - Express - AngularJS - Node.js')
    }
    else if (string == 'SMD') {
      this.data = 'Sr. Mobile Developer';
      this.object.push('•	Support the entire application lifecycle (concept, design, test, release and support.', '•	Produce fully functional mobile applications writing clean code', '•	Gather specific requirements and suggest solutions', '•	Write unit and UI tests to identify malfunctions',
        '•	Troubleshoot and debug to optimize performance', '•	Design interfaces to improve user experience', '•	Liaise with Product development team to plan new features',
        '•	Ensure new and legacy applications meet quality standards', '•	Research and suggest new mobile products, applications and protocols', '•	Stay up-to-date with new technology trends')
      this.skill.push('• Flutter Developer (Android & iOS)', '• Native App Development (Android Development)', '• React Native Developer (Android & iOS)', 'database :', '• sqlite Sql Light', '• Firebase', '• Rest API')
    }
    else if (string == 'MAD') {
      this.data = 'Mobile App  Developer';
      this.object.push('•	Support the entire application lifecycle (concept, design, test, release and support)', '•	Produce fully functional mobile applications writing clean code', '•	Gather specific requirements and suggest solutions', '•	Write unit and UI tests to identify malfunctions',
        '•	Troubleshoot and debug to optimize performance', '•	Design interfaces to improve user experience', '•	Liaise with Product development team to plan new features',
        '•	Ensure new and legacy applications meet quality standards', '•	Research and suggest new mobile products, applications and protocols', '•	Stay up-to-date with new technology trends')
      this.skill.push('• Flutter Developer (Android & iOS)', '• Native App Development (Android Development)',)
    }
    else if (string == 'UUD') {
      this.data = 'UI/UX Designer';
      this.object.push('•	Collaborate with engineers and product managers to gather user requirements.', '•	Use various ideation methods like brainstorming to solve the user’s needs to add value to the company.', '•	Explore various design approaches to solve specific user problems.', '•	Showcase design ideas through sitemaps, storyboards, and process flows.',
        '•	Implement the latest design innovations to ensure that the product is in accordance with the cutting-edge technology.', '•	Define user task flows and interaction models', '•	Create a cohesive style guide to ensure consistent design language is followed across the product.',
        '•	Conduct user research ', '•	Create user personas', '•	Conduct customer and competitor analysis.', '•	Create prototypes, wireframes, and mock-ups to demonstrate the functioning and layout of the product.', '•	Optimises UI designs and tests for intuitiveness and user-centeredness.', '•	Conduct usability testing to identify gaps in design and see if they can be further improved')
      this.skill.push('•	Knows how to use source control systems i.e. Git, SVN', '•	Good understanding of media file formats and file conversions. i.e. PNG vs JPEG. EPS.', '•	Everything in this visual ebook: 20 Things I Learned About Browsers and the Web', '•	Knows how to hack HTML, CSS, and JS', '•	Advanced usage in at least one application of the following categories:', '•	Vector illustration apps (Inkscape, Illustrator, CorelDraw, etc',
        '•	Raster graphic editor (GIMP, Photoshop, Paint, etc', '•	Diagramming tool (LibreOffice, OmniGraffle, Visio, Gliffy, Lucidchart,', '•	Mockups and wire-framming tools (Balsamiq, UXPin, Moqups,Axure.      ')
    }
    else if (string == 'QT') {
      this.data = 'Quality Tester';
      this.object.push('•	Executes test cases under varying circumstances', '•	Documents and evaluates test results', '•	Detects, logs, and reports program bugs and glitches ', '•	Tracks defects and helps troubleshoot errors',
        '•	Implement the latest design innovations to ensure that the product is in accordance with the cutting-edge technology.', '•	Reviews test procedures and develops test scripts', '•	Partners with engineers to drive QA efforts')
      this.skill.push('•	Testim ', '•	SauceLabs', '•	Kualitee', '•	Katalon ', '•	Telerik Test Studio ', '•	TestArchitect ',
        '•	QAProSoft ', '•	Selenium', '•	MicroFocus', '•	Kobiton')
    }
    else if (string == 'TAD') {
      this.data = 'TEST AUTOMATION DEVELOPER';
      this.object.push('• designing and writing test automation scripts', '• investigating problems in software as a result of testing', '•	working with QA analysts and software developers to find  solutions ')
      this.skill.push('•	Testim ', '•	SauceLabs', '•	Kualitee', '•	Katalon ', '•	Telerik Test Studio ', '•	TestArchitect ',
        '• designing and writing test automation scripts ', '• using test automation frameworks', '• investigating problems in software as a result of testing', '• working with QA analysts and software developers to find solutions')
    }
  }
  close() {
    this.Isshowmodel = false;
    this.Isshowmodel1 = false;
    this.Isshowmodel2 = false;
  }
  show(id: any) {
    console.log(id)
    if (id == 1) {
      this.showmodel = !this.showmodel;
      this.showmodel1 = false;
      this.showmodel2 = false;
      this.showmodel3 = false;
    }
    else if (id == 2) {
      this.showmodel = false;
      this.showmodel1 = !this.showmodel1;
      this.showmodel2 = false;
      this.showmodel3 = false;
    }
    else if (id == 3) {
      this.showmodel = false;
      this.showmodel1 = false;
      this.showmodel2 = !this.showmodel2;
      this.showmodel3 = false;
    }
    else if (id == 4) {
      this.showmodel = false;
      this.showmodel1 = false;
      this.showmodel2 = false;
      this.showmodel3 = !this.showmodel3
    }
  }

  applyfun(string: any) {
    this.Isshowmodel1 = !this.Isshowmodel1;
    this.data = [];
    this.object1 = [];
    if (string == 'BDA') {
      this.data = "Business Development Associate";
      this.object1.push('•	Manage sales, transition and delivery of company’s products and services.', '•	Monthly target is mandatory to achieve.', '•	Conduct market research and analysis to create marketing initiatives for promoting company’s products.', '•	Coordinate with internal teams to develop and implement new marketing and sales strategies.',
        '• Inform senior management on new product features to be developed to meet current and future business needs.', '•	Obtain contact information of potential customers through cold calling, internet research and emailing.', '•	Identify and qualify new customers based on company’s business model and guidelines.', '•	Initiate and build relationships with customers through phone, marketing mailer campaigns, in-person contacts, and presentations.',
        '•	Coordinate appointments, meetings and calls between customers and senior management for business expansions and new opportunities.', '•	Manage customer meetings with internal teams for project development and delivery activities.', '•	Maintain a database of potential customer’s contact numbers and emails.', '•	Assist business development team in creating business plan, business model, project budget and scope of work.', '•	Assist senior management in deal negotiations, contract development, due diligence and other business development projects.', '•	Work closely with internal team to deliver business services with high level of customer satisfaction.', '•	Assist in achieving targeted revenues from current and new customers.')
    }
    else if (string == "BDE") {
      this.data = "Business Development Executive";
      this.object1.push('• Build contacts with potential clients to create new business opportunities.', '• Keep prospective client database updated. Monthly target is mandatory to achieve.', '• Negotiating and contracting of rates, special offers, allocation, release periods, terms conditions for hospitality industry.',
        '• Analyzing the product of our different competitors in order to ensure our best conditions in the market', '• Oversee the sales process to attract new clients.', '• Work with senior team members to identify and manage risks.',
        '• Maintain fruitful relationships with clients and address their needs effectively.', '• Research and identify new market opportunities.', '• Prepare and deliver pitches to potential investors.', '• Foster a collaborative environment within the organization.', '• Analyzing opportunities for opening of new destinations and product development',
        '• Assisting in resolving complaints and administrative issues of our customers, vendors etc.', '• Coordinating with the Head Office team.')
    }
    else if (string == "CCR") {
      this.data = "Call Center Representative"
      this.object1.push('•	Manage large amounts of inbound and outbound calls in a timely manner.', '•	Maintain customer satisfaction ratings based on explicit criteria set forth by the company.',
        '•	Attend mandatory training sessions to stay updated on product or company policy changes.', '•	Use company policies to determine if there can be an immediate resolution to a customer issue or if that issue requires managerial input',
        '•	Input data into the company computer platform to keep each customer record updated.', '•	Follow communication “scripts” when handling different topics.', '•	Build sustainable relationships and engage customers by taking the extra mile.',
        '•	Keep records of all conversations in our call center database in a comprehensible way.', '•	Ensure you follow the customer service script provided by the company for uniformity', '•	Also, be well read on company policies and the website for FAQs or policy related answers.',
        '•	Meet personal targets and work towards meeting team targets.', '•	Maintain records of the conversations with the customer and analyze the data.', '•	Utilizing software, databases, scripts, and tools appropriately.', '•	Understanding and striving to meet or exceed call center metrics while providing excellent consistent customer service.',
        '•	Taking part in training and other learning opportunities to expand knowledge of company and position.', '•	Answering or making calls to clients to learn about and address their needs, complaints, or other issues with products or services.')
    }
  }

  applyfunct(string: any) {
    this.Isshowmodel2 = !this.Isshowmodel2;
    this.object2 = [];
    this.data = "Senior Operation Manager"
    this.skill1 = []
    if (string == "SOM") {
      this.skill1.push('•	Comprehensive applied knowledge and expertise, gained at a professional level, in all aspects of the area of focus applicable to the specified role.',
        '•	Skill in examining and re-engineering operations and procedures, formulating policy, and developing and implementing new strategies and procedures.', '•	Ability to analyze complex problems, interpret operational needs, and develop integrated, creative solutions',
        '•	Strong interpersonal skills and the ability to effectively communicate with a wide range of individuals and constituencies in a diverse community.', '•	Advanced analytical, evaluative, and objective critical thinking skills.',
        '•	Working knowledge and understanding of the principles and processes of computerized business and operating systems.', '•	Ability to gather data, compile information, and prepare reports.',
        '•	Knowledge and understanding of integrated program planning, development, and administration within a public institution environment.', '•	Skill in organizing resources and establishing priorities.',
        '•	Ability to supervise and train employees, to include organizing, prioritizing, and scheduling work assignments.', '•	Ability to provide technical guidance and leadership to professional personnel in area of expertise.')

      this.object2.push('•	Senior Operations Manager need to meet and exceed business objectives ensuring consistent achievement of all financial and operational KPIs.', '•	Manage, inspire and motivate a number of Operation Managers to ensure operational excellence, high employee engagement and service improvement is achieved.',
        '•	Responsible for the Operations lead of a team and for the delivery of the overall operational metrics & sales targets.', '•	To proactively maintain regular engagement with key client contacts in line with client expectations.',
        '•	Ensure delivery of Client KPIs/Sales targets including day to day service levels, customer experience, quality measures and compliance measures', '•	Responsible for the development of the operational talent pool by optimizing the skills of the existing team.',' in partnership with our internal recruitment teams to attract the very best external talent, in line with the agreed framework.','succession planning will be in place to ensure key roles are filled and individual talent is recognized.',
        '•	To have a well-defined Communication and Engagement model in place to ensure all teams understand the performance of the business and also that they understand the needs of their teams.', '•	Successfully delivering and managing peak trading period in the hospitality industry.', '•	Responsibility and accountability for the operational performance of the client areas and for exceeding targets of all required metrics.',
        '•	The continuous identification implementation of operational best practice through interaction with the wider team.', '•	Motivate and effectively performance manage Operations Managers within the account to ensure delivery of overall targets and business plan.', '•	Selecting, effectively managing and coaching Operations Managers.', '•	Execute a well-defined Communication and Engagement model in place to ensure all of their teams understand the performance of our business and also that they understand the needs of their teams.',
        '•	Manage and develop the operational client relationships by conductingoperational client review meetings and day to day ops liaison within key people.', '•	Identifying and highlighting further opportunities for services and process improvements Essential Experience.',
        '•	Ability to demonstrate achievement of results e.g. business improvements, cost savings, revenue generation', '•	Excellent leadership, people management, communication and influencing skills at a senior level',
        '•	Ability to build and maintain strong client relationships', '•	Ability to demonstrate been able to translate business strategy into day to day delivery.', '•	Strong commercial understanding and previous accountability for profit targets.',
        '•	Setting and reviewing Quality performance standards.', '•	Setting and reviewing of organisational / productivity objectives in line with the commercial contract.', '•	Managing Client Engagement.',
        '•	Responsible for Business Continuity.', '•	Ability to manage and influence key stakeholders.')
    }
  }
}

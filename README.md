"# jusbid_website_portal_2021" 
-------------------------------------------------------------
Carete module:-
ng g m core --routing=true && ng g c core --skip-tests=true -m=core
-------------------------------------------------------------------


1. Required selections fileds page landing (Flight search form)
2. Comment out the price with date section at liasting page
3. Round trip label color set
4. Set the label of Stop(s)
5. Design the stop filter buttons fonsize, text and border color
6. Flight header logo set according to flight module



on booking detail page Object name : airPriceResponse send the this data with attached booking form details
for booking the filght


----------------------------------------------------------------------------------------------
PENDING TASK:

For one way flight
Step-1: List of flights
Step-2: Details of flight
Step-3: Generate PNR Number / LocatorCode => API:(AirCreateReservationReq)
Step-4: Generate Ticket Number => API:(add-ticketing-request)

Tool for cross check API response

Get the flight list after production
1. Air India
2. Vistara
3. Indigo


====================================================================================================


Amt = 0-999 => GST: 0% and Service Fee: 6%
Amt = 1000-7499 => GST: 12% and Service Fee: 6%
Amt = 7500-Above => GST: 18% and Service Fee: 0%



Amt : Price+GST
Service Tax : Service Tax
# gcal-copy-event
## Google Apps Script for copying events to another calendar
During the COVID-19 shelter-in-place orders, my wife and I needed to know when our meetings were so we could schedule around making sure our baby is supervised.
Manually creating new events (to hide any specific meeting information) and sending an invitation to a calendar we share is a cumbersome process,
but since our companies are using Google Calendar, we can automate the process.

These functions, combined with Google Apps Script Triggers can be used to automate sharing of calendars from enterprise to personal accounts without
any confidential information like title, description, or attendees.

When setting your Triggers, call the "dailyEventRefresh" each morning and "copyUpcomingEvents" on another timer that best suits your needs
(in the example below, the daysInAdvanced shows 7 days, so I run my trigger weekly on Sunday nights).
If your schedule is dynamically updating throughout the day, you can update the trigger to refresh the events on a more frequent schedule.

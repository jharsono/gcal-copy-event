/*
Josh Harsono
github.com/jharsono
linkedin.com/in/jharsono

During the COVID-19 shelter-in-place orders, my wife and I needed to know when our meetings were so we could schedule around making sure our baby is supervised.
Manually creating new events (to hide any specific meeting information) and sending an invitation to a calendar we share is a cumbersome process,
but since our companies are using Google Calendar, we can automate the process.

These functions, combined with Google Apps Script Triggers can be used to automate sharing of calendars from enterprise to personal accounts without
any confidential information like title, description, or attendees.

When setting your Triggers, call the "dailyEventRefresh" each morning and "copyUpcomingEvents" on another timer that best suits your needs
(in the example below, the daysInAdvanced shows 7 days, so I run my trigger weekly on Sunday nights).
If your schedule is dynamically updating throughout the day, you can update the trigger to refresh the events on a more frequent schedule.
*/

// Add your calendar info here

const sourceCalendar = CalendarApp.getCalendarById('source_calendar_id'); // The ID can be found in your Google calendar settings under the "Integrate Calendar" section
const targetCalendar = CalendarApp.getCalendarById('target_calendar_id'); // The calendar where events will be copied to
const eventTitle = 'meeting_title'; // All copies of events will be titled with this
const daysInAdvanced = 7; // How many days in advanced you would like to copy

// Copies one week's worth of events to target calendar

const copyUpcomingEvents = () => {
  const startPeriod = new Date(); // now
  const endPeriod = new Date();

  endPeriod.setDate(startPeriod.getDate() + daysInAdvanced);

  const events = sourceCalendar.getEvents(startPeriod, endPeriod);

  copyEvents(targetCalendar, events, title);
}

// Copies just events for today to target calendar

const copyTodayEvents = () => {
  const today = new Date();

  const events = sourceCalendar.getEventsForDay(today);

  copyEvents(targetCalendar, events, title);
}

// Clears today's events from target calendar for the refresh

const clearTodayEventsFromTargetCalendar = () => {
  const today = new Date();

  const events = targetCalendar.getEventsForDay(today);

  events.forEach(event => {
   const eventTitle = event.getTitle();
   if (eventTitle === title) {
     event.deleteEvent();
   }
  });
}

// Takes in a list of events and iterates through them to create copies on the target calendar

const copyEvents = (target, events, title) => {
  events.forEach(event => {
    if (event.isAllDayEvent()) {
      target.createAllDayEvent(title, event.getAllDayStartDate());
    }
    else {
      target.createEvent(title, event.getStartTime(), event.getEndTime());
    }
    Utilities.sleep(100);
  })
}

// Handles clearing today's events and copying the latest

const dailyEventRefresh = () => {
  clearTodayEventsFromTargetCalendar();
  copyTodayEvents();
}
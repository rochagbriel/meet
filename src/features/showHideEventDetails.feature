Feature: Show and Hide an Event’s Details

Scenario: An event element is collapsed by default
Given the user hasn’t clicked on anything
When the user opens the app
Then the user should see a list of events with limited details.

Scenario: User can expand an event to see its details
Given the user was viewing a list of events
When the user clicks on an event
Then the user should see the event details

Scenario: User can collapse an event to hide its details
Given the user was viewing an event
When the user clicks on the event
Then the user should see the list of events
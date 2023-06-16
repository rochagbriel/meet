Feature: Specify number of events

Scenario: When user hasn't specified number of events, 32 events are displayed by default
Given user hasn't specified number of events
When user opens the app
Then 32 events are displayed by default

Scenario: User can change the number of events they want to see
Given user opens the app
When user changes the number of events they want to see
Then the number of events displayed changes to the number specified by the user
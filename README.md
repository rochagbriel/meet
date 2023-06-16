# Meet App

Welcome to Meet App, a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

## Features

- Filter events by city
- Show/hide event details
- Specify number of events
- Use the app when offline
- Add an app shortcut to the home screen
- View a chart showing the number of upcoming events by city

## User Stories

### FEATURE 1: FILTER EVENTS BY CITY

#### User Story: 
As a user,
I should be able to filter events by city
So that I can easily view events happening in a specific city of my interest.

##### SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
- Given user hasn’t searched for any city;
- When the user opens the app;
- Then the user should see a list of all upcoming events.

##### SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
- Given the main page is open;
- When user starts typing in the city textbox;
- Then the user should see a list of cities (suggestions) that match what they’ve typed.

##### SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
- Given the user was typing “Berlin” in the city textbox
and the list of suggested cities is showing;
- When the user selects a city (e.g., “Berlin, Germany”) from the list;
- Then their city should be changed to that city (i.e., “Berlin, Germany”)
and the user should receive a list of upcoming events in that city.

### FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

#### User Story: 
As a user, 
I should be able to show/hide an event's details
So that I can easily toggle between viewing the event's summary and accessing its additional information.

##### SCENARIO 1: AN EVENT ELEMENT IS COLLAPSED BY DEFAULT
- Given a user is viewing an event list;
- When the page loads;
- Then the event elements should be collapsed by default.

##### SCENARIO 2: USER CAN EXPAND AN EVENT TO SEE ITS DETAILS
- Given a user is viewing an event list;
- When the user clicks on an event element;
- Then the event details should be expanded and displayed to the user.

##### SCENARIO 3: USER CAN COLLAPSE AN EVENT TO HIDE ITS DETAILS
- Given a user has expanded an event to see its details;
- When the user clicks on the expanded event element;
- Then the event details should be collapsed and hidden from the user.

### FEATURE 3: SPECIFY NUMBER OF EVENTS

#### User Story: 
As a user,
I should be able to specify the number of events I want to see
So that I can customize the display to show a desired amount of events that suits my preference and browsing needs.

##### SCENARIO 1: WHEN USER HASN’T SPECIFIED A NUMBER, 32 IS THE DEFAULT NUMBER
- Given a user is using the event app;
- When the user doesn't specify a number of events to display;
- Then the default number of events shown should be 32.

##### SCENARIO 2: USER CAN CHANGE THE NUMBER OF EVENTS THEY WANT TO SEE
- Given a user is using the event app;
- When the user specifies a number of events to display;
- Then the app should update and show the specified number of events to the user.

### FEATURE 4: USE THE APP WHEN OFFLINE

#### User Story: 
As a user,
I should be able to use the app when offline
So that I can access event information even without an internet connection, ensuring continuous usability and convenience.

##### SCENARIO 1: SHOW CACHED DATA WHEN THERE’S NO INTERNET CONNECTION
- Given a user has previously accessed the event app with an internet connection;
- When the user has no internet connection;
- Then the app should display the cached data to the user.

##### SCENARIO 2: SHOW ERROR WHEN USER CHANGES THE SETTINGS (CITY, TIME RANGE)
- Given a user has no internet connection;
- When the user tries to change the app settings (city, time range);
- Then the app should display an error message informing the user that the changes cannot be made without an internet connection.

### FEATURE 5: DATA VISUALIZATION

#### User Story: 
As a user,
I should be able to view data visualization in the form of charts or graphs
So that I can easily interpret and understand the distribution or trends of events, enabling better insights and decision-making.

##### SCENARIO 1: SHOW A CHART WITH THE NUMBER OF UPCOMING EVENTS IN EACH CITY
- Given a user is viewing the event app;
- When the user requests to view a chart with the number of upcoming events in each city;
- Then the app should generate and display a chart showing the distribution of events in each city.

## Usage of Severless Functions

The Meet App leverages serverless functions, specifically AWS Lambda, to handle various backend operations. Here's how serverless functions are used in the app:

### 1. Event Registration: 

- When a user registers for an event, a serverless function is triggered to handle the registration process. The function interacts with the database and adds the user's registration details. This ensures a seamless and efficient registration experience for users.

### 2. Event Search: 

- The app allows users to search for events based on city name. When a user performs a search, a serverless function is invoked to retrieve and filter the relevant event data from the database. The function dynamically generates the search results and returns them to the user interface, enabling efficient event discovery.

### 3. Scalability and Cost Efficiency: 

- By utilizing serverless functions, the Meet App benefits from automatic scaling based on demand. As the app experiences varying levels of user activity, the serverless functions scale dynamically, ensuring optimal performance without the need for manual provisioning or managing infrastructure. Additionally, serverless functions offer cost efficiency as they charge based on actual usage, eliminating the cost of idle resources.

### 4. Simplified Development: 

- Serverless functions provide a simplified development experience for the Meet App. With serverless architecture, developers can focus on writing the business logic and functionality of the app without the need to manage servers or infrastructure. This streamlined development approach allows for faster iterations and updates to the app.

In summary, the Meet App effectively utilizes serverless functions to handle event registration, search, offline support, scalability, and cost efficiency. The use of serverless technology simplifies development and ensures a seamless user experience, making it a valuable component of the app's architecture.

## Technologies Used

- JavaScript: Programming language used for the client-side development;
- React.js: JavaScript library for building the user interface;
- React Scripts: Preconfigured scripts for efficient React application development, including hot reloading, production builds, linting, testing, and deployment.
- React-Bootstrap: CSS framework for responsive and visually appealing design;
- Prettier: Code formatter for consistent and clean code styling;
- npm: Package manager for managing dependencies and running scripts;
- OAuth2: Secure authorization framework for granting limited access to user resources between websites and applications without sharing credentials;
- AWS Lambda: Serverless computing service by AWS for running code without managing servers, ensuring scalability and simplified development.
- Jest: JavaScript testing framework for unit testing and assertions.
- Cucumber: Behavior-driven development (BDD) testing framework for testing application behavior using plain-text specifications.
- Puppeteer: Node.js library for controlling headless Chrome or Chromium browsers, used for automated browser testing and web scraping.

## Credits

Special thanks to my Tutor Stanley Okwii(CareerFoundry) and my Mentor Faizal Patel(CareerFoundry) for guiding me throughout the development process.

## Contact

If you have any questions, comments, or feedback about this website, please feel free to reach out to me using the contact form on the website or by emailing me at rochagbriel@gmail.com.
const { google } = require('googleapis'); // Google API library
const OAuth2 = google.auth.OAuth2; // Google oAuth2 library
const calendar = google.calendar('v3'); // Google Calendar API v3 library

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']; // Google Calendar scope

const credentials = {
  // Google API credentials
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  redirect_uris: ['https://rochagbriel.github.io/meet/'],
  javascript_origins: [
    'https://rochagbriel.github.io',
    'http://localhost:3000',
  ],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials; // Destructure Google credentials
const oAuth2Client = new google.auth.OAuth2( // Create Google oAuth2 client
  client_id,
  client_secret,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  // Get Google oAuth2 URL

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  // Get Google OAuth2 access token
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(token),
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};

module.exports.getCalendarEvents = (event) => {
  // Get Google Calendar events

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  const access_token = decodeURIComponent(
    `${event.pathParameters.access_token}`
  );

  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => { // Get events
    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, res) => { 
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  })
  .then((results) => { // Return events
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({ events: results.data.items }),
    };
  })
  .catch((err) => { // Return error
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(err),
    };
  });
}

// endpoints:
//   GET - https://ed8mr9xu2k.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url
//   GET - https://ed8mr9xu2k.execute-api.eu-central-1.amazonaws.com/dev/api/token/{code}
//   GET - https://ed8mr9xu2k.execute-api.eu-central-1.amazonaws.com/dev/api/get-calendar/{access_token}

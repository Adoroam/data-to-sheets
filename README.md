# Data to sheets

- start a google api project with the dashboard
- generate a credentials.json
- npm i to install google api modules
- create a `config.js` with an export named `spreadsheetId` that matches the id of your google spreadsheet
- run the app to get a token.json
- use exported `logToSheets` function to write your data to a google sheet
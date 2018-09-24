const { google } = require('googleapis');

const { spreadsheetId } = require('./config')

const genHeaders = obj => Object.keys(obj)
const genValues = obj => genHeaders(obj).map(key => obj[key])
const genSheetData = ([head, ...tail]) => [genHeaders(head), genValues(head), ...tail.map(genValues)]


const defineRange = ({ values }) => {
  const columnNames = '0ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  let startColumn = 'A'
  let startRow = 1
  let columns = values[0].length 
  let endColumn = columnNames[columns + 1]
  let endRow = values.length
  return `Sheet1!${startColumn}${startRow}:${endColumn}${endRow}`
}

process.on('auth', auth => {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.update({
    spreadsheetId,
    range: defineRange(process.resource),
    valueInputOption: 'RAW',
    resource: process.resource
  }).catch(console.log)
})

const logToSheets = (data) => {
  process.resource = {
    values: genSheetData(data)
  }
  require('./auth')
}

module.exports = { logToSheets }


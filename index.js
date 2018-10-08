const { google } = require('googleapis');

const { spreadsheetId } = require('./config')

const genHeaders = obj => Object.keys(obj)
const genValues = obj => genHeaders(obj).map(key => obj[key])
const genSheetData = ([head, ...tail]) => [genHeaders(head), genValues(head), ...tail.map(genValues)]

const genColumns = () => {
  let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  let genLetter = ind => base.map(letter => base[ind] + letter)
  let all = base.map((x, ind) => genLetter(ind)) 
  let merged = base
  let actuallyMerged = merged.concat.apply(merged, all) 
  actuallyMerged.unshift('0')
  return actuallyMerged
}

const defineRange = ({ values }) => {
  const columnNames = genColumns()
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

const crushRows = ([head, ...tail]) => tail
  .map((values) => head
    .map((key, ind) => ({ [key]: values[ind] }))
    .reduce((a, b) => ({ ...a, ...b })))

const jsToSheets = (data) => {
  process.resource = {
    values: genSheetData(data)
  }
  require('./auth')
}

module.exports = { jsToSheets }


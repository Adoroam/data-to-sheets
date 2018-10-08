const { jsToSheets } = require('./index')

let testData = [
  { name: 'shifu', weapon: 'spear', type: 'melee' },
  { name: 'bakko', weapon: 'axe', type: 'melee' },
  { name: 'rook', weapon: 'meat', type: 'melee' },
  { name: 'freya', weapon: 'hammers', type: 'melee' },
  { name: 'ashka', weapon: 'fire', type: 'ranged' },
  { name: 'jade', weapon: 'sniper rifle/pisotls', type: 'ranged' },
  { name: 'iva', weapon: 'shotgun', type: 'ranged' },
  { name: 'ice bitch', weapon: 'ice', type: 'ranged' },
  { name: 'oldur', weapon: 'sand', type: 'support' },
  { name: 'sirius', weapon: 'cardboard', type: 'support' }
]

jsToSheets(testData)
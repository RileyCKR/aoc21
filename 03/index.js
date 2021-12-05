const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let dataValues = data.split('\n')
  
  let bitCounts = new Array(dataValues[0].length)
  bitCounts.fill(0, 0, bitCounts.length)
  let totalCount = dataValues.length

  dataValues.forEach(line => {
    let characters = line.split('')
    characters.forEach((character, i) => {
      if (character === '1') {
        bitCounts[i]++
      }
    })
  })

  // convert the 'bit' counts to decimal
  console.log('total count', totalCount)
  console.log('bit counter', bitCounts)

  let gamma = 0
  let epsilon = 0
  for (let i = 0; i < bitCounts.length; i++) {
    let index = bitCounts.length - i - 1

    // note that in case there is no least/most often occuring bit, the bit is left as 0 default
    if (bitCounts[index] > totalCount / 2) {
      gamma += Math.pow(2, i)
    } else if (bitCounts[index] < totalCount / 2) {
      epsilon += Math.pow(2, i)
    } else {
      'even steven'
    }
  }
  console.log('gamma', gamma)
  console.log('epsilon', epsilon)
  console.log('answer', gamma * epsilon)
})

const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let dataValues = data.split('\n')
  
  const oxygenCriteria = (i, bitCounts, total) => {
    return bitCounts[i] >= total / 2 ? '1' : '0'
  }

  const co2Criteria = (i, bitCounts, total) => {
    return bitCounts[i] >= total / 2 ? '0' : '1'
  }

  const calculateDiagnostic = (diagnosticValues, bitCriteria, i) => {

    let bitCounts = new Array(diagnosticValues[0].length)
    bitCounts.fill(0, 0, bitCounts.length)
    let totalCount = diagnosticValues.length
  
    // count the number of occurences of each bit, we will use this later for the least/most common bit logic
    diagnosticValues.forEach(line => {
      let characters = line.split('')
      characters.forEach((character, i) => {
        if (character === '1') {
          bitCounts[i]++
        }
      })
    })

    const filteredValues = diagnosticValues.filter(value => value[i] === bitCriteria(i, bitCounts, totalCount))
    console.log('filteredValues', filteredValues)
  
    if (filteredValues.length === 1) {
      return filteredValues[0]
    } else if (filteredValues.length === 0) {
      return 'ERROR'
    } else {
      return calculateDiagnostic(filteredValues, bitCriteria, i+1)
    }
  }

  let oxygen = calculateDiagnostic(dataValues, oxygenCriteria, 0)
  let co2 = calculateDiagnostic(dataValues, co2Criteria, 0)

  console.log('raw oxygen', oxygen)
  console.log('raw co2', co2)
  
  const convertBinaryToDecimal = (binaryString) => {
    let reversed = binaryString.split('').reverse()
    return reversed.reduce((accumulator, current, i) => {
      if (current === '1') {
        return accumulator + Math.pow(2, i)
      }
      return accumulator
    }, 0)
  }

  const decimalOxygen = convertBinaryToDecimal(oxygen)
  const decimalCo2 = convertBinaryToDecimal(co2)
  console.log('o2 decimal', decimalOxygen)
  console.log('co2 decimal', decimalCo2)
  console.log('life support', decimalOxygen * decimalCo2)
})

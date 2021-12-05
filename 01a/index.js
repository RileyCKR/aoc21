const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let dataValues = data.split('\n')
  
  let answer = 0
  let previousWindow = null
  for (let i = 0; i < dataValues.length - 2; i++) {
    let currentWindow = parseInt(dataValues[i]) + parseInt(dataValues[i+1]) + parseInt(dataValues[i+2])
    if (previousWindow !== null && currentWindow > previousWindow) {
      answer++
    }
    previousWindow = currentWindow
  }
  console.log('answer is', answer)
})

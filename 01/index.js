const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let dataValues = data.split('\n')
  
  let answer = 0
  dataValues.reduce((previous, current) => {
    if (previous !== null && parseInt(current) > parseInt(previous)) {
      answer ++
    }
    return current
  }, null)
  console.log('answer is', answer)
})

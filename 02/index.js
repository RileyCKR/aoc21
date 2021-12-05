const fs = require('fs')

// state machine for our submarine
class Submarine {
  position
  depth

  constructor(x, depth) {
    this.position = x
    this.depth = depth
  }

  forward = (val) => {
    this.position += val
  }

  down = (val) => {
    this.depth += val
  }

  up = (val) => {
    this.depth -= val
  }

  getAnswer = () => {
    return this.position * this.depth
  }
}


fs.readFile(`${__dirname}/input.txt`, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let dataValues = data.split('\n')
  
  let submarine = new Submarine(0,0)
  dataValues.forEach(line => {
    // parse out the command and dynamically call the corresponding method
    let parsedLine = line.split(' ')
    let command = parsedLine[0]
    let value = parsedLine[1]

    submarine[command](parseInt(value))
  })

  console.log('answer is', submarine.getAnswer())
})

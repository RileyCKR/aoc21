const fs = require('fs')

// state machine for our submarine
class Submarine {
  position
  depth
  aim

  constructor(position, depth, aim) {
    this.position = position
    this.depth = depth
    this.aim = aim
  }

  forward = (val) => {
    this.position += val
    this.depth += this.aim * val
  }

  down = (val) => {
    this.aim += val
  }

  up = (val) => {
    this.aim -= val
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
  
  let submarine = new Submarine(0,0,0)
  dataValues.forEach(line => {
    // parse out the command and dynamically call the corresponding method
    let parsedLine = line.split(' ')
    let command = parsedLine[0]
    let value = parsedLine[1]

    submarine[command](parseInt(value))
  })

  console.log('answer is', submarine.getAnswer())
})

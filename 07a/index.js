const fs = require('fs')

let data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
let dataValues = data.split(',').map(it => parseInt(it))

class Crab {
  constructor(position) {
    this.originalPosition = position
    this.position = position
  }

  setPosition(position) {
    this.position = position
  }

  getFuelUsed() {
    if (this.originalPosition > this.position) {
      return this.originalPosition - this.position
    } else {
      return this.position - this.originalPosition
    }
  }

  // get the fuel needed to move to a position
  caculateFuel(position) {
    let distance = 0
    let firstNumber
    let lastNumber
    if (this.position > position) {
      distance = this.position - position
      firstNumber = position
      lastNumber = this.position
    } else {
      distance = position - this.position
      firstNumber = this.position
      lastNumber = position
    }

    let sum = 0
    for(let i = 0; i <= distance; i++) {
      sum += i
    }
    // console.log(`${this.position} => ${position} = (${distance}) ${sum}`)
    return sum
  }
}

let crabs = dataValues.map(position => new Crab(position))

crabs.sort((a, b) => {
  return a.position - b.position
})

let crabMax = crabs.reduce(function(a, b) {
  return Math.max(a, b.position)
}, 0)

console.log('crabMax', crabMax)

let fuelDictionary = {}
let minSum = undefined

for (let i=0; i < crabMax; i++) {
  let sum = 0
  crabs.forEach(crab => {
    sum += crab.caculateFuel(parseInt(i))
  })

  if (minSum === undefined) {
    minSum = sum
  } else if (minSum > sum) {
    minSum = sum
  }
  console.log(`${i}: ${sum}`);
  fuelDictionary[i.toString()] = sum
}

console.log('answer', minSum)
console.log('(\\/) (°,,,,°) (\\/)')

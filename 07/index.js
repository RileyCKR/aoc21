const fs = require('fs')

let data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
let dataValues = data.split(',').map(it => parseInt(it))

// console.log(dataValues)

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
    if (this.position > position) {
      return this.position - position
    } else {
      return position - this.position
    }
  }
}

let crabs = dataValues.map(position => new Crab(position))

crabs.sort((a, b) => {
  return a.position - b.position
})

// strategy ideas: sort the crabs by position-order, then:
// a. find the most common position.  move all crabs to that position
// b. find the least common position, move those crabs to their nearest neighbor
// c. brute force every position to find the answer


// here we use the brute-force method
let crabDictionary = {}
crabs.forEach(crab => {
  if (crabDictionary[crab.position.toString()] !== undefined) {
    crabDictionary[crab.position.toString()] += 1
  } else {
    crabDictionary[crab.position.toString()] = 1
  }
})

let fuelDictionary = {}
let minSum = undefined
for (const [key, value] of Object.entries(crabDictionary)) {
  let sum = 0
  crabs.forEach(crab => {
    sum += crab.caculateFuel(parseInt(key))
  })

  if (minSum === undefined) {
    minSum = sum
  } else if (minSum > sum) {
    minSum = sum
  }
  console.log(`${key}: ${sum}`);
  fuelDictionary[key] = sum
}


console.log('answer', minSum)
console.log('(\\/) (°,,,,°) (\\/)')

const fs = require('fs')

let data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
let dataValues = data.split(',').map(it => parseInt(it))

let SPAWN_COUNT = 6
let INITIAL_SPAWN_PENALTY = 2

class Pond {
  fishSchool
  constructor(initialSchool) {
    console.log(initialSchool)
    // the index of the array reprents the age of the fish.  All fish of the same age
    // will remain in the same groups which saves on memory space vs tracking fish
    // individually.  In essence the fish are grouped by their spawn-age.
    this.fishSchool = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    initialSchool.forEach(fishAge => {
      this.fishSchool[fishAge]++
    })
  }

  tick = () => {
    let fishBabies = this.fishSchool[0] // the number of newborn fish equals the number of 0 spawn-age fish at the start of the tick

    // move fish down in the fishSchool array.  0 age fish move up to the spawn age
    let zeroAgeFish = this.fishSchool[0]
    for (let i=0; i < this.fishSchool.length; i++) {
      this.fishSchool[i] = this.fishSchool[i+1]
    }

    this.fishSchool[SPAWN_COUNT] += fishBabies
    this.fishSchool[SPAWN_COUNT + INITIAL_SPAWN_PENALTY] = fishBabies // fish are born
  }

  count = () => {
    let sum = 0
    for(let i=0; i < this.fishSchool.length; i++) {
      sum += this.fishSchool[i]
    }
    return sum
  }
}

let initialSchool = dataValues
let pond = new Pond(initialSchool)

let generations = 256

for(let i=0; i < generations; i++){
  pond.tick()
  console.log(`gen${i}, ${pond.count()}`)
}

console.log('answer', pond.count())
console.log('>=D')

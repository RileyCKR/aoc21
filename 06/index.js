const fs = require('fs')

let data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
let dataValues = data.split(',').map(it => parseInt(it))

let SPAWN_COUNT = 6
let INITIAL_SPAWN_PENALTY = 2

class Pond {
  fishSchool
  constructor(fishSchool) {
    this.fishSchool = fishSchool
  }

  tick = () => {
    let fishBabies = []
    for(let i = 0; i < this.fishSchool.length; i++){
      this.fishSchool[i]--
      if (this.fishSchool[i] < 0) {
        this.fishSchool[i] = SPAWN_COUNT
        fishBabies.push(SPAWN_COUNT + INITIAL_SPAWN_PENALTY)
      }
    }

    fishBabies.forEach(fish => {
      this.fishSchool.push(fish)
    })
  }
}

let initialSchool = dataValues
let pond = new Pond(initialSchool)

let generations = 256

for(let i=0; i < generations; i++){
  pond.tick()
  console.log(`gen${i}, ${pond.fishSchool.length}`)
}

console.log('answer', pond.fishSchool.length)
console.log('>=D')

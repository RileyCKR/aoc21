const fs = require('fs')

let data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
let dataValues = data.split(',').map(it => parseInt(it))

let SPAWN_COUNT = 6
let INITIAL_SPAWN_PENALTY = 2

class Fish {
  spawnTimer

  constructor(spawnTimer) {
    this.spawnTimer = spawnTimer
  }

  tick = () => {
    this.spawnTimer--
  }
}

class Pond {
  fishSchool
  constructor(fishSchool) {
    this.fishSchool = fishSchool
  }

  tick = () => {
    let fishBabies = []
    this.fishSchool.forEach(fish => {
      fish.tick()
      if (fish.spawnTimer < 0) {
        fish.spawnTimer = SPAWN_COUNT
        fishBabies.push(new Fish(SPAWN_COUNT + INITIAL_SPAWN_PENALTY))
      }
    })
    this.fishSchool.push(...fishBabies)
  }
}

let initialSchool = dataValues.map(it => new Fish(it))
let pond = new Pond(initialSchool)

let generations = 80

for(let i=0; i < generations; i++){
  pond.tick()
  // console.log(pond.fishSchool)
}
// console.log(pond)
console.log('answer', pond.fishSchool.length)
console.log('>=D')

const fs = require('fs')

let data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
let dataValues = data.split(',').map(it => parseInt(it))

let SPAWN_COUNT = 6
let INITIAL_SPAWN_PENALTY = 2

class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  add = (node) => {
    if (!this.head) {
      this.head = node
    }
    if (!this.tail) {
      this.tail = node
    } else {
      this.tail.next = node
    }

    if (!node.next) {
      this.tail = node
      this.size++
    } else {
      let seeker = node
  
      while(seeker) {
        this.size ++
        this.tail = seeker
        seeker = seeker.next
      }
    }
    
  }

  count = () => {
    if (!this.head) {
      return 0
    }

    let i = 0
    let seeker = this.head

    while(seeker) {
      i++
      seeker = seeker.next
    }

    return i
  }

  toLog = function() {
    let buffer = ''
    let seeker = this.head

    while (seeker) {
      buffer += seeker.element + ','
      seeker = seeker.next
    }
    console.log(buffer)
  }
}

class Pond {
  fishSchool
  constructor(fishSchool) {
    this.fishSchool = fishSchool
  }

  tick = () => {
    let fishBabies = new LinkedList()
    let node = this.fishSchool.head

    while(node) {
      node.element--
      if (node.element < 0) {
        node.element = SPAWN_COUNT
        
        let baby = new Node(SPAWN_COUNT + INITIAL_SPAWN_PENALTY)
        fishBabies.add(baby)
      }
      node = node.next
    }

    if (fishBabies.head) {
      this.fishSchool.add(fishBabies.head)
    }
  }

  // solve(generation) {
  //   for(let i=0; i < this.fishSchool.length; i++) {
  //     let fish = this.fishSchool[i]
      
  //     // given the age of a fish and the number of generations to simulate we can easily calculate how many offspring that fish will have
  //     let offspring = (generation - fish) % SPAWN_COUNT
      
  //   }
  // }
}

let list = new LinkedList()
dataValues.forEach(value => {
  let node = new Node(value)
  list.add(node)
})

console.log('seed size is', list.size)
let pond = new Pond(list)

let generations = 256

pond.fishSchool.toLog()
for(let i=0; i < generations; i++){
  // is there a way to know how many fish will be produced by a fish with n generations?
  // given a fish with age 6, how many ancestors will that fish have after n generations?
  pond.tick()
  console.log(`gen${i}, ${pond.fishSchool.size}`)
  // pond.fishSchool.toLog()

}

console.log('answer', pond.fishSchool.size)
// console.log('count', pond.fishSchool.count())
console.log('>=D')

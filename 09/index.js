const fs = require('fs')

let data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
let heightMap = data.split('\n').map(it => it.split('').map(it => parseInt(it)))

let yAxisMax = heightMap.length
let xAxisMax = heightMap[0].length

const getValueAtCoords = (y, x) => {
  return heightMap[y][x]
}

const checkForLowPoint = (y, x) => {
  let value = heightMap[y][x]
  if (value === 9) {
    return false
  }

  if (y < yAxisMax - 1 && value >= getValueAtCoords(y+1, x)) {
    return false
  }
  if (y > 0 && value >= getValueAtCoords(y-1, x)) {
    return false
  }
  if (x < xAxisMax - 1 && value >= getValueAtCoords(y, x+1)) {
    return false
  }
  if (x > 0 && value >= getValueAtCoords(y, x-1)) {
    return false
  }
  return true
}

let riskSum = 0

for(let y = 0; y < yAxisMax; y++) {
  for(let x = 0; x < xAxisMax; x++) {
    if (checkForLowPoint(y, x)) {
      let risk = 1 + heightMap[y][x]
      riskSum += risk
    }
  }
}

console.log('answer', riskSum)

/*
part 2 strategy

-find all lowest points
-grow basins in x/y dimension until no more room to grow
-sort basins by size
*/

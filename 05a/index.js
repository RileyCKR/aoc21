const fs = require('fs')

let data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
let dataValues = data.split('\n')

class Point {
  constructor(x,y) {
    this.x = parseInt(x)
    this.y = parseInt(y)
  }
}

class LineSegment {
  constructor(begin, end) {
    // Points which represent the line boundaries
    this.begin = begin
    this.end = end

    this.isHorizontal = begin.y === end.y
    this.axis = this.isHorizontal ? 'x' : 'y'
    this.isDiagonal = begin.x !== end.x && begin.y !== end.y

    // make sure the lines are not "backwards", take care of it now to make the logic simpler later
    let isBackwards = begin[this.axis] > end[this.axis]
    this.begin = isBackwards ? end : begin
    this.end = isBackwards ? begin : end

    this.length = this.end[this.axis] - this.begin[this.axis]

    if (this.length < 0) {
      // debugging from bad string comparisons
      console.log('************')
      console.log(this)
      console.log('begin', begin)
      console.log('end', end)
    }
  }

  getHitbox = () => {

    let hitBox = []
    
    if (!this.isDiagonal) {
      for(let i = this.begin[this.axis]; i <= this.end[this.axis]; i++) {
        hitBox.push(new Point(
          this.isHorizontal ? i : this.begin.x,
          this.isHorizontal ? this.begin.y : i
        ))
      }
    } else {
      // compensate for the 'direction' of the line
      let xOffset = this.begin.x > this.end.x ? -1 : 1
      let yOffset = this.begin.y > this.end.y ? -1 : 1

      // all lines are perfectly diagonal, so the length is identical in both axes
      for(let i=0; i <= this.length; i++) {
        hitBox.push(new Point(
          this.begin.x + (i * xOffset),
          this.begin.y + (i * yOffset)
        ))
      }
    }

    return hitBox
  }
}

class Field {
  constructor(size) {
    let field2d = []
    for(let i = 0; i < size; i++) {
      let arr = new Array(size)
      arr.fill(0)
      field2d.push(arr)
    }
    this.field2d = field2d
  }

  addLineSegment = segment => {
    if (segment.end.x >= this.field2d.length) {
      throw new Error('X axis is too small, need ' + segment.end.x)
    }
    if (segment.end.y >= this.field2d.length) {
      throw new Error('Y axis is too small, need ' + segment.end.y)
    }
    let hitBox = segment.getHitbox()
    
    hitBox.forEach(point => {
      this.field2d[point.x][point.y] += 1
    });
  }

  toString = function() {
    try {
      let buffer = ''
      for(let i=0; i < this.field2d.length; i++) {
        for(let j=0; j < this.field2d.length; j++) {
          let cell = this.field2d[j][i]
          if (cell === 0) {
            buffer += '.'
          } else {
            buffer += cell
          }
        }
        buffer += '\n'
      }
      return buffer
    } catch {
      return 'field.toString() error'
    }
  }

  getDangerCount = limit => {
    let matchCount = 0
    this.field2d.forEach(row => {
      row.forEach(cell => {
        if (cell >= limit) {
          matchCount++
        }
      })
    })
    return matchCount
  }
}

let segments = dataValues.map(fileLine => {
  let lineCoordinates = fileLine.split(' -> ')
  return new LineSegment(
    new Point(...lineCoordinates[0].split(',')),
    new Point(...lineCoordinates[1].split(','))
  )
})

let field = new Field(1000)

segments.forEach(segment => {
  // console.log(segment)
  field.addLineSegment(segment)
})

// console.log(field.toString())
console.log('answer is', field.getDangerCount(2))

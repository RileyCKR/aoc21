const fs = require('fs')

let data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
let dataValues = data.split('\n').map(it => it.split(' | '))


class Display {
  uniquePatterns
  output
  solved
  segments
  constructor(uniqueValues, display) {
    this.uniquePatterns = uniqueValues
    this.output = display
    // this.segments = this.getDict(undefined)

    let solved = {}
    this.solved = solved

    let num1 = uniqueValues.find(pattern => pattern.length === 2)
    let num2 = undefined
    let num3 = undefined
    let num4 = uniqueValues.find(pattern => pattern.length === 4)
    let num5 = undefined
    let num6 = undefined
    let num7 = uniqueValues.find(pattern => pattern.length === 3)
    let num8 = uniqueValues.find(pattern => pattern.length === 7)

    solved[num1] = 1
    solved[num7] = 7
    solved[num4] = 4
    solved[num8] = 8
    // this.segments.a = num7.split('').find(it => num1.split('').indexOf(it) === -1)
    
    let segmentsLength5 = uniqueValues.filter(it => it.length === 5)

    // 3 has none of the length5 one count signals
    num3 = this.solveUsingMask([...segmentsLength5], undefined)
    solved[num3] = 3
    segmentsLength5 = segmentsLength5.filter(segment => segment !== num3)

    // of the remaining 5 length segments, 5 is the one that has none of the unique signals between 2,4, and 5 that is not 4
    num5 = this.solveUsingMask([num4, ...segmentsLength5], num4)
    solved[num5] = 5
    segmentsLength5 = segmentsLength5.filter(segment => segment !== num5)

    // 2 is the only remaining length 5 segment
    num2 = segmentsLength5[0]
    solved[num2] = 2

    let segmentsLength6 = uniqueValues.filter(it => it.length === 6)
    // let dictionaryLength6 = this.getSegmentCount(segmentsLength6)

    // use a mask to solve for 9 using 0,6,9,3
    let num9 = this.solveUsingMask([num4, ...segmentsLength6], num4)
    solved[num9] = 9
    segmentsLength6 = segmentsLength6.filter(segment => segment !== num9)

    // use a mask to solve for 0 using 0,6,1
    let num0 = this.solveUsingMask([num1, ...segmentsLength6], num1)
    solved[num0] = 0
    segmentsLength6 = segmentsLength6.filter(segment => segment !== num0)

    // 6 is the only remaining segment
    num6 = segmentsLength6[0]
    solved[num6] = 6

    console.log(solved)
  }

  getDict = (defaultValue) => {
    return {
      a: defaultValue,
      b: defaultValue,
      c: defaultValue,
      d: defaultValue,
      e: defaultValue,
      f: defaultValue,
      g: defaultValue,
    }
  }

  getSignalsByLeastOccurence = (signalCountDictionary) => {
    console.log(signalCountDictionary)
    let signalMatch = []
    let countToCheck = 0
    while (signalMatch.length === 0 && countToCheck < 4) {
      for (const [key, value] of Object.entries(signalCountDictionary)) {
        if (value === countToCheck) {
          signalMatch.push(key)
        }
      }
      countToCheck++
    }
    
    return signalMatch
  }

  oddMenOut = (segments, signals) => {
    //find the segments that does not contain any of the signals
    let oddMen = segments.filter(segment => {
      let found = true
      signals.forEach(signal => {
        if (segment.indexOf(signal) !== -1) {
          found = false
        }
      })
      return found
    })
    return oddMen
  }

  solveUsingMask = (segments, exclude) => {
    let dictionaryToTest = this.getSegmentCount(segments)
    let uniques = this.getSignalsByLeastOccurence(dictionaryToTest, 1)
    let solvedPattern = this.oddMenOut(segments, uniques).find(it => it !== exclude)
    return solvedPattern
  }

  getSegmentCount = (segments) => {
    let dictionary = this.getDict(0)
    segments.forEach(pattern => {
      let chars = pattern.split('')
      chars.forEach(char => {
        dictionary[char] += 1
      })
    })
    return dictionary
  }

  getDisplayValue = () => {
    let outputNums = this.output.map(it => this.solved[it]).join('')
    console.log(outputNums)
    return parseInt(outputNums)
  }
}

let displayData = dataValues.map(it => {
  let part0 = it[0].split(' ')
  let part1 = it[1].split(' ')


  part0 = part0.map(it => it.split('').sort().join(''))
  part1 = part1.map(it => it.split('').sort().join(''))

  return new Display(part0, part1)
})

// console.log(displayData)

let sum = 0
displayData.forEach(display => {
  sum += display.getDisplayValue()
  // sum += display.output.filter(segment => segment.length === 2 || segment.length === 3 || segment.length === 4 || segment.length === 7).length
})

console.log('answer', sum)
// note that seven and one are different only by one cell

// 1, 4, 7, and 8 have unique segment counts

// cell counts
/* cell counts
  1:
  2: 1
  3: 7
  4: 4
  5: 2,3,5
  6: 0,6,9
  7: 8
*/

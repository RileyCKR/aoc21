const fs = require('fs')

class BingoBoard {
  // 2D array of numbers
  bingoSheet

  // 2D array of booleans
  hitSheet

  name

  constructor(bingoSheet, name) {
    this.bingoSheet = bingoSheet
    this.hitSheet = bingoSheet.map(line => {
      let arr = new Array(line.length)
      arr.fill(false, 0, arr.length)
      return arr
    })
    this.name = name
  }

  // check for matches and update the hitSheet if necessary
  playNumber = number => {
    this.bingoSheet.forEach((sheetLine, i) => {
      sheetLine.forEach((cellNumber, j) => {
        if (cellNumber === number) {
          console.log('ooh la la', cellNumber, number)
          this.hitSheet[i][j] = true
        }
      })
    })
  }

  checkWinner = () => {
    // check horizontal
    let horizontalWinner = this.hitSheet.findIndex(horizontalLine => horizontalLine.every(cell => cell))
    if (horizontalWinner > -1) {
      console.log('horizontal winner', this.name)
      return true
    }

    // check vertical
    for(let i = 0; i < this.hitSheet[0].length; i++) {
      if (this.hitSheet.every(horizontalLine => horizontalLine[i])) {
        console.log('vertical winner', this.name)
        return true
      }
    }
    
    // diagonals don't count
    // // check diagonal, assumes a square board
    // let match1 = true
    // let match2 = true
    // let length = this.hitSheet[0].length
    // for(let i = 0; i < this.hitSheet[0].length; i++) {
    //   match1 = match1 && this.hitSheet[i][i]
    //   match2 = match2 && this.hitSheet[length - i - 1][length - i - 1]
    // }
    // if (match1 || match2) {
    //   console.log('diagnoal match')
    //   return true
    // }
    return false
  }

  getScore = (lastNumber) => {
    let score = 0
    this.hitSheet.forEach((horizontalLine, i) => {
      horizontalLine.forEach((cell, j) => {
        if(!cell) {
          score += this.bingoSheet[i][j]
        }
      })
    })
    return score * lastNumber
  }
}

class BingoGame {
  bingoMoves
  bingoBoards
  turn

  constructor(bingoMoves, bingoBoards) {
    this.bingoMoves = bingoMoves
    this.bingoBoards = bingoBoards
    this.turn = 0
  }

  play = () => {
    if (this.turn >= this.bingoMoves.length) {
      console.log('ERROR!  No Winner.')
      return 0
    }

    let number = this.bingoMoves[this.turn]
    console.log('number is', number)
    this.bingoBoards.forEach(board => board.playNumber(number))
    if (this.checkWinners(number)) {
      console.log('game over')
      return 0
    }
    this.turn ++
  }

  checkWinners = (lastNumber) => {
    if (this.bingoBoards.length > 1) {
      let losers = this.bingoBoards.filter(board => !board.checkWinner())
      this.bingoBoards = losers
      return false
    } else {
      let loser = this.bingoBoards[0]
      if (loser.checkWinner()) {
        console.log('LOSER: ' + loser.name + ': ' + loser.getScore(lastNumber))
        return true
      }
    }

    return false
  }
}

let data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
let dataValues = data.split('\n')

let moves = dataValues[0].split(',').map(it => parseInt(it))

// method that buffers lines from the input and splits on a match,
// eg split empty lines into seperate batches to create bingo boards.
const bufferLines = (lines, lineMatch, bufferMethod) => {
  let buffer = []
  let bufferedValues = []
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === lineMatch) {
      bufferedValues.push(bufferMethod(buffer, bufferedValues.length))
      buffer = []
      continue
    }
    buffer.push(lines[i])
    if (i === lines.length - 1) {
      bufferedValues.push(bufferMethod(buffer, bufferedValues.length))
    }
  }
  return bufferedValues
}

let bingoBoards = bufferLines(dataValues.filter((it, i) => i >= 1), '', (lines, i) => {
  let numberLines = lines.map(line => line.split(' ').filter(it => !isNaN(parseInt(it))).map(it => parseInt(it)))
  return new BingoBoard(numberLines, 'BingoBoard' + (i + 1))
})

let bingoGame = new BingoGame(moves, bingoBoards)

console.log(bingoGame)

// bingoGame.play()
while(bingoGame.play() !== 0) {

}

const tableHead = document.getElementById('word')
const tableBody = document.getElementById('tableBody')
const calling = document.getElementById('calling')
const card = document.getElementById('card')

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlString = urlParams.get('str')

const numRows = 5
const max = 75

let possibleCombinations = []
let possibleWinners = new Array()
let word
let win = false
let usedUrlString = false

let words = [
  "WIT",
  "SUNSET",
  "ALMOND",
  "MARKET",
  "GENERAL",
  "BULL",
  "GENETICS",
  "ARTIST",
  "WINDOW",
  "LEMUR",
  "TOTALLY",
  "INSPIRED",
  "CROSS",
  "VANILLA",
  "LIBERAL",
  "COMPUTER",
  "DEATH",
  "REALIST",
  "NERVE",
  "CAPITAL",
  "SPEED",
  "WARNING",
  "VOID",
  "WINGMAN",
  "PEARL",
  "TRUTH",
  "BIRDS",
  "CRY",
  "CLOUD",
  "LOVE",
  "KITTEN",
  "SEXY",
  "FEEL"
]

// words = [
//   "TEST"
// ]

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

function randomBetween(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
}

function simpleNode(tagName, innerText, className = null, id = null) {
  let node = document.createElement(tagName)
  node.innerText = innerText
  if (id != null) {node.id = id}
  if (className != null) {node.classList.add(className)}
  return node
}

function Word(word) {
  this.value = word
  this.letters = word.split('')
  this.length = this.letters.length
}

let numPossibleCombinations

function generatePossibleCombinations() {
  let differentLetters = Array.from(new Set(word.letters))
  differentLetters.forEach((letter) => {
    for (i = 1; i <= max; i++) {
      possibleCombinations.push(`${letter}${i}`)
    }
  })
  // console.log(possibleCombinations)
  numPossibleCombinations = possibleCombinations.length
}

function generatePossibleWinners() {
  let width = word.length
  let height = word.length
  for (i = 0; i < height; i++) {
    possibleWinners[i] = new Array()
    for (j = 0; j < width; j++) {
      possibleWinners[i].push(`x${i}y${j}`)
    }
  }
  for (i = height; i < height*2; i++) {
    possibleWinners[i] = new Array()
    for (j = 0; j < width; j++) {
      possibleWinners[i].push(`x${j}y${i-width}`)
    }
  }
}

function newCard(rows = word.length) {
  card.textContent = ''
  setWord()
  generatePossibleCombinations()
  generatePossibleWinners()
  let columns = document.querySelectorAll('.column')
  let headers = []
  columns.forEach((column, i) => {
    column.headerVal = column.querySelector('.header').innerText
    // if (headers.indexOf(column.headerVal) >= 0) {
    //   return
    // }
    headers.push(column.headerVal)
    column.numbers = []
    while(column.numbers.length < rows) {
      let number = randomBetween(1,75)
      if (column.numbers.indexOf(number) === -1) column.numbers.push(number)
    }
    
    column.numbers.forEach((number, j) => {
      let node = simpleNode('div', number)
      let x = i
      let y = j
      node.dataset.coords = `x${x}y${y}`
      node.dataset.callId = `${word.letters[i]}${number}`
      column.appendChild(node)
    })
  })
}

function setWord() {
  word.letters.forEach((letter) => {
    let header = simpleNode('div', letter, 'header')
    let node = simpleNode('div', "", 'column', null)
    node.appendChild(header)
    card.appendChild(node)
  })
}

let callId = 0
let ticks = []
let running = true

function call() {
  if (running == false) return
  callId++
  let string = possibleCombinations.random()
  let index = possibleCombinations.indexOf(string)
  let matches = document.querySelectorAll(`[data-call-id="${string}"]`)
    if (matches.length > 0) {
      matches.forEach((match) => {
        ticks.push(match.dataset.coords)
        checkWin()
        match.classList.add('matched')
      })
    }
    possibleCombinations.splice(index, 1)
    window.setTimeout(() => call(), 100) 
    if (win == false) {
      calling.innerText = string
    }
}

function checkWin() {
  // console.log(ticks)
  // compare winners arrays to ticked coordinate array
  for(let i = 0; i < word.length*2; i++) {
    let cellExists = 0;

    for(var j = 0; j < possibleWinners[i].length; j++) {
      ticks = Array.from(ticks)
      for(var z = 0; z < ticks.length; z++) {
        if(possibleWinners[i][j] === ticks[z]) {
          cellExists++
        }
      }
    }

    // if all winner cells exist: win
    if(cellExists == word.length) {
      stop()
      win = true
      console.log('win')
      calling.innerText = 'win'
      window.setTimeout(function(){init(true)}, 2000)
      return
    }
  }
}

function stop() {
  running = false
}

function init(go = false) {
  win = false
  running = true
  ticks = []
  calling.innerText = ''
  possibleCombinations = []
  possibleWinners = []
  if (!usedUrlString && urlString != null) {
    word = new Word(urlString.toUpperCase())
    usedUrlString = true
  } else {
    word = new Word(words.random())
  }
  console.log(word)
  newCard(word.length)
  if(go == true) {
    call()
  }
  // running = true
}

init(true)
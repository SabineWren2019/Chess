var selectedChecker = undefined
var checkers = [
  {row: 1, cell: 1, color: 'red', type:'rook'},
  {row: 1, cell: 2, color: 'red', type:'knight'},
  {row: 1, cell: 3, color: 'red', type:'bishop'},
  {row: 1, cell: 4, color: 'red', type:'king'},
  {row: 1, cell: 5, color: 'red', type:'queen'},
  {row: 1, cell: 6, color: 'red', type:'bishop'},
  {row: 1, cell: 7, color: 'red', type:'knight'},
  {row: 1, cell: 8, color: 'red', type:'rook'},
  {row: 2, cell: 1, color: 'black', type:'pawn'},
  {row: 2, cell: 2, color: 'red', type:'pawn'},
  {row: 2, cell: 3, color: 'black', type:'pawn'},
  {row: 2, cell: 4, color: 'red', type:'pawn'},
  {row: 2, cell: 5, color: 'red', type:'pawn'},
  {row: 2, cell: 6, color: 'red', type:'pawn'},
  {row: 2, cell: 7, color: 'black', type:'pawn'},
  {row: 2, cell: 8, color: 'red', type:'pawn'},
  {row: 7, cell: 1, color: 'black', type:'Bpawn'},
  {row: 7, cell: 2, color: 'black', type:'Bpawn'},
  {row: 7, cell: 3, color: 'black', type:'Bpawn'},
  {row: 7, cell: 4, color: 'black', type:'Bpawn'},
  {row: 7, cell: 5, color: 'black', type:'Bpawn'},
  {row: 7, cell: 6, color: 'black', type:'Bpawn'},
  {row: 7, cell: 7, color: 'black', type:'Bpawn'},
  {row: 7, cell: 8, color: 'black', type:'Bpawn'},
  {row: 8, cell: 1, color: 'black', type:'Brook'},
  {row: 8, cell: 2, color: 'black', type:'Bknight' },
  {row: 8, cell: 3, color: 'black', type:'Bbishop'},
  {row: 8, cell: 4, color: 'black', type:'Bking'},
  {row: 8, cell: 5, color: 'black', type: 'Bqueen'},
  {row: 8, cell: 6, color: 'black', type:'Bbishop'},
  {row: 8, cell: 7, color: 'black', type:'Bknight'},
  {row: 8, cell: 8, color: 'black', type:'Brook'},
  ]

function evenOrOdd(num) {
  return (num % 2 == 0) ? 'even' : 'odd'
}

function cellColor(cellNum, rowNum) {
  return evenOrOdd(cellNum) == evenOrOdd(rowNum) ? 'red' : 'black'
}

function createCell(rowNum, cellNum) {
  if (cellColor(cellNum, rowNum) === 'black') {
    return ` <div id="cell-${rowNum}-${cellNum}"  class="cell black"></div>`
  } else {
    return ` <div id="cell-${rowNum}-${cellNum}" class="cell red"></div>`
  }
}

function createRow(rowNum) {
  return `
  <div id="row-${rowNum}" class="row">
  ${createCell(rowNum, 1)}
  ${createCell(rowNum, 2)}
  ${createCell(rowNum, 3)}
  ${createCell(rowNum, 4)}
  ${createCell(rowNum, 5)}
  ${createCell(rowNum, 6)}
  ${createCell(rowNum, 7)}
  ${createCell(rowNum, 8)}
</div>
  `
}

function createBoard() {
  console.log(`starting createBoard()`)
  return `
  ${createRow(1)}
  ${createRow(2)}
  ${createRow(3)}
  ${createRow(4)}
  ${createRow(5)}
  ${createRow(6)}
  ${createRow(7)}
  ${createRow(8)} 
  `
}

function createCheckers() {
  console.log (`starting createCheckers`)
  clearBoard()
  $(`.black.cell`).click(MoveselectedCheckerHere)
  $(`.red.cell`).click(MoveselectedCheckerHere)
  for(let i=0; i<checkers.length; i++) {
    let checker = checkers[i];
    if (checker.row && checker.cell) { $(`#cell-${checker.row}-${checker.cell}`).html(createChecker(i, checker.color, checker.type))
    $(`#cell-${checker.row}-${checker.cell}`).unbind('click')
  } 
  else {
    console.log(`put `, checker, ` into out of play`)
    $(`#out-of-play-${checker.color}`).append(`<div class="cell">${createChecker(i, checker.color, checker.type)}</div>`)
  } }

  $(`.selected`).removeClass(`selected`)
  $('.checker').click(selectChecker)
  console.log("I just added the click handler for checkers")
}

function createChecker(i, color, type) {
  return `<div id="checker-${i}" class="checker ${color}-checker ${type}"><div>`
}


function selectChecker() {
  let checker = $(this)
  if(checker.hasClass(`selected`)) {
    console.log(`this checker was already selected`)
    remove()
    return
  }

  $(`.selected`).removeClass(`selected`)

  let id = checker.attr('id')
  console.log('selecting checker', checker)
  console.log(` the id of the selected checker is ${id}`)
  let stringParts = id.split('-')
  let checkerIndex = stringParts[1]
  console.log(`checkerIndex ==`, checkerIndex)
  selectedChecker = checkers[checkerIndex]
  checker.addClass(`selected`)

}

function remove() {
selectedChecker.row = undefined
selectedChecker.cell = undefined
selectedChecker = undefined
$(`.selected`).removeClass(`selected`)
createCheckers()


}
function clearBoard() {
  $(`.black.cell`).html(``)
  $(`.black.cell`).unbind('click')
  $(`.red.cell`).html(``)
  $(`.red.cell`).unbind('click')
  $(`.out-of-play`).html(``)
  selectedChecker = undefined
  $(`.selected`).removeClass(`selected`)
  console.log('cleared board again')
}
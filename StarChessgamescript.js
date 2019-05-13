$(document).ready(function () {
console.log('document is ready')
console.log('please work')
$('#board-container').html(createBoard())
createCheckers()
    $('.checker').click(selectChecker)
    
    })

    function MoveselectedCheckerHere() {
if(selectedChecker) {
    let blackCell = $(this)
    let id = blackCell.attr('id')
    console.log(`id:`, id)
    let idParts = id.split('-')

    selectedChecker.row = idParts [1]
    selectedChecker.cell = idParts [2]
    selectedChecker = undefined
    createCheckers() 
    
  
}

else {
    console.log(`No checker Selected`)
}
    }
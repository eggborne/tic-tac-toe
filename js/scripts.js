var board = [];
var currentPlayer;
$(function(){
  CG = new ColumnGenerator();
  CG.insertLayout('board',boardLayout,'#board-area',true)
  makeSpacesSquare()
  var totalSpaces = boardLayout.length*(boardLayout[0][0])
  boardLayout.forEach(function(row,i){
    var row = row[0]
    for (var j=0; j<row.length; j++) {
      new Space(i,j)
    }
  })
})
function Space(row,column) {
  this.div = $('#column-'+row+'-'+column)
  this.symbol = "blank"
  this.row = row
  this.column = column
  this.changeSymbol = function(newSymbol) {
    this.symbol = newSymbol
    this.div.removeClass('x')
    this.div.removeClass('o')
    this.div.addClass(this.symbol)
  }
  var self = this
  this.div.mousedown(function(event){
    if (event.button === 0) {
      self.changeSymbol('x')
    } else {
      self.changeSymbol('blank')
    }
  })
  if (!board[row]) {
    board[row] = []
  }
  board[row][column] = this
  this.changeSymbol('o')
}
var boardLayout = [
  [[4,4,4]],
  [[4,4,4]],
  [[4,4,4]]
]
function makeSpacesSquare() {
  var spaceSize = $('#row-0').width()/3
  // var spaceSize = ($('.container').width()/2)/3 // 1/3 of a col-6
  CG.changeRowHeight("board","all",spaceSize+"px")
}
window.addEventListener('resize',function(){
  if ($('#board').height() !== $('#board').width()) {
    makeSpacesSquare()
  }
})
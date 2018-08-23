var boardContents = [];
var players = [];
var symbols = ["x","o"]
var currentPlayer;
$(function(){
  generator = new ColumnGenerator();
  board = new Board(boardLayout)
  player1 = new Player()
  player2 = new Player()
  currentPlayer = player1
})
function Space(board,row,column) {
  console.log(board + " board");
  
  this.div = $('#column-'+row+'-'+column)
  this.symbol = "blank"
  this.board = board
  this.row = row
  this.column = column
  var self = this
  this.div.mousedown(function(event){
    if (event.button === 0) {
      self.changeSymbol(currentPlayer.symbol)
    } else {
      self.changeSymbol('blank')
    }
  })
  if (!this.board.contents[row]) {
    this.board.contents[row] = []
  }
  this.board.contents[row][column] = this
  this.changeSymbol('blank')
}
Space.prototype.changeSymbol = function(newSymbol) {
  this.symbol = newSymbol
  this.div.removeClass('x')
  this.div.removeClass('o')
  this.div.addClass(this.symbol)
}
function Player(name) {
  this.index = players.length
  this.symbol = symbols[this.index]
  this.name = name
  players.push(this)
}
function Board(layout) {
  this.div = $('#board')
  this.layout = layout
  this.contents = []
  this.checkForLine = function() {
    
  }
  generator.insertLayout('board',boardLayout,'#board-area',true)
  this.layout.forEach(function(row,i){
    var row = row[0]
    for (var j=0; j<row.length; j++) {
      new Space(this,i,j)
    }
  },this)
  makeSpacesSquare()
}
var boardLayout = [
  [[4,4,4]],
  [[4,4,4]],
  [[4,4,4]]
]
// responsiveness
function makeSpacesSquare() {
  var spaceSize = $('#row-0').width()/3
  generator.changeRowHeight("board","all",spaceSize+"px")
}
window.addEventListener('resize',function(){
  if ($('#board').height() !== $('#board').width()) {
    makeSpacesSquare()
  }
})
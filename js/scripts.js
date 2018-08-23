var boardContents = [];
var numberOfPlayers = 2
var symbols = ["x","o"]
var currentPlayer;
$(function(){
  generator = new ColumnGenerator();
  game = new Game(boardLayout)
})
function Space(board,row,column) {
  console.log(board + " board");
  this.div = $('#column-'+row+'-'+column)
  this.div.addClass('space')
  this.symbol = "blank"
  this.board = board
  this.row = row
  this.column = column
  var self = this
  this.div.click(function(event){
    if (currentPlayer) {
      currentPlayer.clickSpace(self)
    }
  })
  if (!this.board.contents[row]) {
    this.board.contents[row] = []
  }
  this.board.contents[row][column] = this
  this.changeSymbol('blank')
}
Space.prototype.changeSymbol = function(newSymbol,dim="") {
  this.symbol = newSymbol
  this.div.removeClass(['dim','x','o'])
  this.div.addClass("blank "+this.symbol+" "+dim)
}
function Player(game) {
  this.index = game.players.length;
  var playerNum = this.index+1;
  this.symbol = symbols[this.index];
  this.name = "Player " + playerNum;
  this.ready = false;
  this.laid = false;
  this.lastClicked = undefined;
  this.confirmed = false;
  this.nameInput = $('#player-'+playerNum+'-input')
  this.markReady = function() {
    $('#player-'+playerNum+'-body').html(`<img src="img/`+this.symbol+`.png">`)
    $('#ready-button-'+playerNum).text("Confirm Move")
    $('#ready-button-'+playerNum).removeClass('wait')
    console.log(this.name)
    this.ready = true;
    if (game.playersReady()) {
      game.startGame()
    }
  }
  this.clickSpace = function(space) {
    if (this.lastClicked !== undefined) {
      this.lastClicked.changeSymbol('blank')
    }
    space.changeSymbol(this.symbol,"dim")
    this.lastClicked = space
  }
  console.log("playernum " + playerNum)
  this.cardHTML = `<div class="card player-card" id="player-`+playerNum+`">
                    <div class="card-header">
                      <span class="h4" style="font-weight:bold" id="player-`+playerNum+`-name">
                        `+this.name+`
                      </span>
                    </div>
                    <div class="card-body">
                    <div id="player-`+playerNum+`-body">
                      <input class="form-control" type="text" id="player-`+playerNum+`-input" placeholder="Player `+playerNum+`">
                      </div>
                      <button id="ready-button-`+playerNum+`" class="btn btn-success btn-block">Ready!</button>
                    </div>
                  </div>`
  $('#player-card-area').append(this.cardHTML)
  var self = this
  $('#ready-button-'+playerNum).click(function(){
    self.markReady()
  })
  game.players.push(this)
}
function Board(layout) {
  this.div = $('#board')
  this.layout = layout
  this.contents = []
  this.checkForLine = function() {
    
  }
  generator.insertLayout('board',boardLayout,'#board-area',true)
  var self = this
  this.layout.forEach(function(row,i){
    var row = row[0]
    for (var j=0; j<row.length; j++) {
      new Space(self,i,j)
    }
  })
  makeSpacesSquare()
}
function Game(boardLayout) {
  this.board = new Board(boardLayout);
  this.players = [];
  for (var i=0; i<numberOfPlayers; i++) {
    new Player(this)
  }
  this.startGame = function() {
    currentPlayer = this.players[0]
    $('#player-'+(currentPlayer.index+1)).css({
      'border': '12px solid green'
    })
    $("#status-area").html(`<h4>It's `+currentPlayer.name+`'s turn...</h4>`)
  }
  this.playersReady = function() {
    var allReady = true
    this.players.forEach(function(player){
      if (!player.ready) {
        allReady = false
      }
    })
    return allReady
  }
}
document.onkeyup = function(){
  game.players.forEach(function(player,i){
    i = i+1
    if (document.getElementById('player-'+i+'-input')===document.activeElement) {
      $('#player-'+i+'-name').html($('#player-'+i+'-input').val())
      player.name = $('#player-'+i+'-input').val()
    }
  })
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
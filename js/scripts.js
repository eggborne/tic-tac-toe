$(function(){
  CG = new ColumnGenerator();
  CG.insertLayout('board',boardLayout,'#board-area',true)
  makeSpacesSquare()
  $('.column.generated').click(function(){
    console.log("clicked " + this.id)
    $(this).css({
      'background-color': 'black'
    })
  })
})
var boardLayout = [
  [[4,4,4]],
  [[4,4,4]],
  [[4,4,4]]
]
function makeSpacesSquare() {
  console.log("squaring...")
  var spaceSize = ($('.container').width()/2)/3 // 1/3 of a col-6
  CG.changeRowHeight("board","all",spaceSize+"px")
}
window.addEventListener('resize',function(){
  console.log($('#board').width())
  if ($('#board').height() !== $('#board').width()) {
    makeSpacesSquare()
  }
})
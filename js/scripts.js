$(function(){
  new ColumnGenerator().insertLayout('board',boardLayout,'#board-area',true)
  Array.from($('#board').children()).forEach(function(row,i){
    
  })
  $('#board').css({
    'width': '360px'
  })
})
var boardLayout = [
  [[4,4,4],'120px'],
  [[4,4,4],'120px'],
  [[4,4,4],'120px']
]
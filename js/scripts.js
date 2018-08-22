$(function(){
  new ColumnGenerator().insertLayout('board',boardLayout,'#board-area',true)
  $('.column.generated').click(function(){
    console.log("clicked " + this.id)
    $(this).css({
      'background-color': 'black'
    })
  })
})
var boardLayout = [
  [[4,4,4],'120px'],
  [[4,4,4],'120px'],
  [[4,4,4],'120px']
]
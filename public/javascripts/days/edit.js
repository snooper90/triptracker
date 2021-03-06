$(document).ready(function(){

  $('#tripForm').on('submit', function(e){
    if (!$('.endpoint').last().val()){
      e.preventDefault()
    }
  })

  $('#removeFormRowBtn').on('click', function(e){
    e.preventDefault();
    $('#expandForm').children().last().remove();
  });

  $('#addNewFormRowBtn').on('click', function(  ){
    var value = $('.endpoint').last().val();
    if(value){
      $('#expandForm').append(formSection(value))
    }
    return
  })
});

function formSection(value){
  return '<div class="col-sm-12"><label for="start">Starting point</label> <input type="text" name="start" value="'+ value +'"> <label for="waypoints">Stoping point</label> <input type="text" class="endpoint" name="waypoints" placeholder="stop"> <label for="location_name">Location discription</label> <input type="text" name="locationDiscription" placeholder="reason"></div>'
}

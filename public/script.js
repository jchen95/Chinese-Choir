$('li.list-group-item').hover(function(){
  $(this).toggleClass('active')
})

$('li.list-group-item').click(function(){
  var href = $(this).attr('href')
  $('iframe').attr('src', href)
})


$('#btnSubmit').click(function(){
  $('#myAlert').show('fade')
})

$('#files').click(function(){
  var currentPic = files.indexOf(picture)
  $("img-fluid").attr("src",'/upload/' + album + '/' + files[currentpic + 1]);
})


var files = document.getElementById('files').textContent.split(',')
var album = document.getElementById('album').textContent

$('#next').click(function(){
  var actualPic = $('#currentpic').attr("src")
  console.log(actualPic)
  var b = actualPic.split('/')
  var currentPic = files.indexOf(b[3])
  var newPic = (files[currentPic + 1])
  if (currentPic + 1 > files.length - 1 ) {
    return
  } else {
    var imageSource = '/upload/' + album + '/' + newPic
    $("#currentpic").attr("src", imageSource);
  }
})

$('#back').click(function(){
  var actualPic = $('#currentpic').attr("src")
  console.log(actualPic)
  var b = actualPic.split('/')
  var currentPic = files.indexOf(b[3])
  var newPic = (files[currentPic - 1])
  if (currentPic - 1 < 0 ) {
    return
  } else {
    var imageSource = '/upload/' + album + '/' + newPic
    $("#currentpic").attr("src", imageSource);
  }
})



// var pictureUrl = document.getElementById('currentpic').src
// var pictureUrlArray = pictureUrl.split('/')
// var selectedPicture = pictureUrlArray.splice(pictureUrlArray.length-1 , 1).toString()
// var pictureUrlArray = pictureUrlArray.splice(0,3)
// var pictureUrlString = pictureUrlArray.toString().replace(/,/g, "/")


// console.log(pictureUrlString)

// var actualPic = $('#currentpic').attr("src")
// console.log(actualPic)
// var b = actualPic.split('/')
// console.log(b[3])
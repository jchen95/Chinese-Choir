var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
var multer = require('multer')
var bodyParser = require('body-parser')

function checkFileType(req,file,cb){
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null, true)
  } else {
    cb(null,false)
  }  
}

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'/views/'))
app.use(express.static("public"))
app.use(bodyParser.json());
require('dotenv').config()


app.listen(3000, function(){
  console.log("server has started")
})


app.get('/', function(req,res){
  res.render('homepage')
})

app.get('/files', function(req,res){
  res.render('files')
})


app.get('/pictures/:album', function(req,res){
  var album = req.params.album
  var uploads = './public/upload/' + album
  var files = fs.readdirSync(uploads)
  res.render('album', {
    pictures: files,
    album: album
  })
})

app.post('/pictures/:album', function(req,res){
  var album = req.params.album
  var storage = multer.diskStorage({
    destination: './public/upload/' + album,
    filename: function(req,file,cb){
      cb (null, Date.now() + path.extname(file.originalname))
    }
  })
  var upload = multer({
    storage: storage,
    limits:{fileSize: 25000000},
    fileFilter: checkFileType
  }).any('upl')
  upload(req,res,function(err){
    if (err) {
      res.render('album', {
        msg:err
      })
    } else {
      
      var album = req.params.album
      var uploads = './public/upload/' + album
      var files = fs.readdirSync(uploads)
      console.log('picture was stored')
      res.render('album',
      {
        pictures: files,
        album: album
      })
    }
  })
})

app.get('/pictures/:album/:id', function(req,res){
  var album = req.params.album
  var picture = req.params.id
  var uploads = './public/upload/' + album
  var files = fs.readdirSync(uploads)
  res.render('showpic', {
    picture: picture,
    album: album,
    files:files
  })
})


app.get('/contact', function(req,res){
  res.render('contact')
})





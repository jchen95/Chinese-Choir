var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
var multer = require('multer')
var storage = multer.diskStorage({
  destination: './public/upload',
  filename: function(req,file,cb){
    cb (null, file.originalname + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({
  storage: storage,
  limits:{fileSize: 25000000},
  fileFilter: checkFileType
}).single('upl')

function checkFileType(req,file,cb){
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null, true)
  } else {
    cb(null,false)
  }  
}


// function checkFileType(file,cb){
//   var filetypes = /jpeg|jpg|png|gif/;
//   var extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   var mimetype = filetypes.test(file.mimetype);
//   if(mimetype && extname){
//     return cb(null,true);
//   } else {
//     cb('Error: Images Only');
//   }
// }


var bodyParser = require('body-parser')


require('dotenv').config()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'/views/'))
app.use(express.static("public"))
app.use(bodyParser.json());

app.listen(3000, function(){
  console.log("server has started")
})


app.get('/', function(req,res){
  res.render('homepage')
})

app.get('/sheets', function(req,res){
  res.render('sheets')
})


app.get('/music', function(req,res){
  res.render('music')
})


app.get('/pictures', function(req,res){
var uploads = './public/upload/'
var files = fs.readdirSync(uploads)
  res.render('pictures', {
    pictures: files
  })
})

app.post('/pictures', function(req,res){
  upload(req,res,function(err){
    if (err) {
      res.render('pictures', {
        msg:err
      })
    } else {
      var uploads = './public/upload/'
      var files = fs.readdirSync(uploads)
      console.log('picture was stored')
      res.render('pictures',
      {
        pictures: files
      })
    }
  })
})



app.get('/pictures/:id', function(req,res){
  var picture = req.params.id
  res.render('showpic', {
    picture: picture
  })
})

app.get('/contact', function(req,res){
  res.render('contact')
})




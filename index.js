var express = require('express')
var app = express()
var path = require('path')
require('dotenv').config()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))
app.use(express.static("public"))

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
  res.render('pictures')
})

app.get('/contact', function(req,res){
  res.render('contact')
})




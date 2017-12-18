const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use(function (req,res,next) {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n');
    next();
});

//
// app.use(function (req, res, next){
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear',function () {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',function (text) {
    return text.toUpperCase()
});

app.get('/', function (req, res) {
   res.render('home.hbs',{
       pageTitle:'home page',
       welcomeMessage:'Welcome to my website'
   })
});

app.get('/about', function (req,res) {
    res.render('about.hbs',{
        pageTitle:'About Page'
    })
});

app.get('/bad',function (req, res) {
    res.send({
        errorMessage:'unable to handle request'
    })
});

app.listen(port, function () {
    console.log('Serve is up on port 3000')
});


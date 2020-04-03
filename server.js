var express = require ('express');
var app = express();
var fs = require ('fs');
var multer = require ('multer');
var bodyParser = require('body-parser')
var path = require('path');
var images;
//const url = require('url');
var Storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null,"./site/songs");
  },
  filename: function(req,file,callback){
    callback(null, file.originalname);
  }
});

var upload = multer({
  storage: Storage
}).array("songUploader",3);

 app.use(express.static(__dirname+"/site")); //necessary to serve this folder

 app.get("/", function(req, res) {
     res.sendFile(__dirname + "/site/index.html");
 });


 app.get("/getSongs", function(req,res){
   songList = fs.readdirSync("site/songs/")

   files = {"songs" : songList}
   return res.end(JSON.stringify(files));
 });

 app.post("/upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong");
         }
         return res.sendFile(__dirname + "/site/start.html");
     });
 });

app.get("/song_show.html",function (req, res){
     res.sendFile(__dirname + "/site/song_show.html");
});
app.listen(8000);

console.log("Server running on 8000");

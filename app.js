var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
  res.render('index.html')
});

app.get('/:time', function(req, res) {
   var time= req.params.time;  

 if(isNaN(time) && new Date(time).getTime() >0){
   var unix =new Date(time).getTime()/1000;
   var date= {
   	 "Normal Time":time,
     "Unix TimeStamp":unix
   };

   res.sendStatus(JSON.stringify(date));
  }
 else if(!isNaN(time)){
 	var date = new Date(time*1000);
	  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	  var year = date.getFullYear();
	  var month = months[date.getMonth()];
	  var date = date.getDate();
	var formatted= month+" "+date+", "+year;
   
      var finaldate= {
     "Unix TimeStamp":time,
     "Normal Time":formatted
   };
	res.sendStatus(JSON.stringify(finaldate));
 }

 else {
 	var finaldate ={
     "Unix TimeStamp":null,
     "Normal Time":null
 	}
 	res.sendStatus(JSON.stringify(finaldate));
 }

});

app.listen(3000, function() {
	console.log('Server started on port 3000');
});
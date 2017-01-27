var express = require('express');
var app= express();
var MongoClient = require('mongodb').MongoClient,
 format = require('util').format;
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser= require('body-parser');


var server_port = process.env.OPENSHIFT_NODEJS_PORT || '7555';
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
var url = 'mongodb://localhost:27017/contactlist';


if(process.env.OPENSHIFT_MONGODB_DB_URL){
  url = process.env.OPENSHIFT_MONGODB_DB_URL +'contactlist';
}


app.use(express.static(__dirname+ "/public"));
//app.use(bodyParser.json());
app.use(express.json());
var dbCollection;

app.get('/contactlist',function(req,res){
    console.log('recieved a get');
	
	MongoClient.connect(url, function(err, db1) {
  if (err) throw err;
  console.log("Connected to Database");
  

db.contactlist.find(function(err,docs){
        console.log(docs);
        res.json(docs);
		db1.close()
    });


});

});

    
// //   trying push data from server to front end as static test
    
//	person1 = {
//	name:'NAME',
//	email:'EMAIL',
//	number:'MOBILE'
//	};
//	person2 = {
//	name:'Murugesan',
//	email:'m.murrugesann@gmail.com',
//	number:'98655578'
//	};
//	
//	var contactlist= [person1,person2];
//    res.json(contactlist);
    
    
    // // Accessing data from mongo db
    
    /* db.contactlist.find(function(err,docs){
        console.log(docs);
        res.json(docs); */
    //});

app.post('/contactlist',function(req,res){
   // console.log(req.body);
	   MongoClient.connect(url, function(err, db1) {
	  if (err) throw err;
	  console.log("Connected to Database");
			var val ={name:req.body.name, email:req.body.email,number:req.body.number};
		   //var list = db.collection('contactlist');
			db.contactlist.insert(val, function(err,res){
				if(!err)
					console.log("Inserted into Db");
					
					db1.close();
			});
    
    
});
});

app.delete('/contactlist/:id',function(req,res){
	
	
	 MongoClient.connect(url, function(err, db1) {
	  if (err) throw err;
	  console.log("Connected to Database");

					var id = req.params.id;
					console.log(id);
					db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
						res.json(doc);
						db1.close();
    
    });
});
});
app.get('/contactlist/:id',function(req,res){
    MongoClient.connect(url, function(err, db1) {
	  if (err) throw err;
	  console.log("Connected to Database");


			   var id = req.params.id;
				console.log(id);
				db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
					console.log(doc);
					res.json(doc);
					db1.close();
				});
});
});
app.put('/contaclist/:id',function(req,res){

	 MongoClient.connect(url, function(err, db1) {
	  if (err) throw err;
	  console.log("Connected to Database");
				var id= req.params.id;
				console.log("Name in server"+req.body.name);
				db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
											 update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
											 new: true},function(err,doc){
												res.json(doc);
												db1.close();
    });
});
});
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});    

console.log('Server running in port 3000');
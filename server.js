var express = require('express');
var app= express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser= require('body-parser');


app.use(express.static(__dirname+ "/public"));
//app.use(bodyParser.json());
app.use(express.json());


app.get('/contactlist',function(req,res){
    console.log('recieved a get');

    
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
    
    db.contactlist.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist',function(req,res){
   // console.log(req.body);
    var val ={name:req.body.name, email:req.body.email,number:req.body.number};
   //var list = db.collection('contactlist');
    db.contactlist.insert(val, function(err,res){
        if(!err)
            console.log("Inserted into Db");
    });
    
    
});

app.delete('/contactlist/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
        
    
    });
});

app.get('/contactlist/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
        console.log(doc);
        res.json(doc);
    });
});

app.put('/contaclist/:id',function(req,res){
    var id= req.params.id;
    console.log("Name in server"+req.body.name);
    db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
                                 update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
                                 new: true},function(err,doc){
                                    res.json(doc);
    });
});
    
app.listen(3000);
console.log('Server running in port 3000');
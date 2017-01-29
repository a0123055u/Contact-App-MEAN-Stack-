var express = require('express');
var app= express();
var mongojs = require('mongojs');
var db = mongojs('user:password@ds135669.mlab.com:35669/contactlist',['contactlist']);

var bodyParser= require('body-parser');
var server_port = process.env.OPENSHIFT_NODEJS_PORT || '7555';
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname+ "/public"));
app.use(express.json());

app.get('/contactlist',function(req,res)
{
    console.log('recieved a get');    
    db.contactlist.find(function(err,docs)
    {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist',function(req,res)
{
    var val ={name:req.body.name, email:req.body.email,number:req.body.number};
    db.contactlist.insert(val, function(err,res)
    {
        if(!err)
            console.log("Inserted into Db");
    });
});

app.delete('/contactlist/:id',function(req,res)
{
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc)
    {
        res.json(doc);
    });
});

app.get('/contactlist/:id',function(req,res)
{
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc)
    {
        console.log(doc);
        res.json(doc);
    });
});

app.put('/contaclist/:id',function(req,res)
{
    var id= req.params.id;
    console.log("Name in server"+req.body.name);
    db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
                                 update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
                                 new: true},function(err,doc){
                                    res.json(doc);
    });
});

app.listen(server_port, server_ip_address, function () 
{
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});    

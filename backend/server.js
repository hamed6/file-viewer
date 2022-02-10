// test user:
// mi98vb
// 9839260
// 67paso


const https = require ('https');
// import https from 'https';

const http= require('http');
// import http from 'http';

const fs = require ('fs'); 
// import fs from 'fs';

const express = require('express');
// import express from 'express';
const session = require ('express-session');
// import session from 'express-session';

const cors=require('cors');
// import cors from 'cors';

const bodyParse =require ('body-parser');
// import bodyParse from 'body-parser';

const mongoose = require('mongoose');
// import mongoose from 'mongoose';

const  userProfiles = require('./models/userProfile');
const userDocuments=require('./models/userDocument')
// const userDocuments=require('./models/userProfile');
// import userProfiles from './models/userProfile';

const path=require('path');
// import path from 'path';


// import bcrypt from 'bcryptjs';

const app = express();
app.use(bodyParse.json());
app.use(cors());
const router = express.Router();
// app.use('/', router);
// app.enable('trust proxy');

// PRODUCTION PORT  1
const port=443;
// const port =80;
// IP PORT
// const port=8080;

const ip = '94.237.93.109';
const options = {
    key: fs.readFileSync('/root/csrDomain/2020/ubuntu-1cpu-1gb-de-fra1.key'),
    cert: fs.readFileSync('/root/csrDomain/2020/primary.crt'),
    ca:[
        fs.readFileSync('/root/csrDomain/2020/root.crt'),
        fs.readFileSync('/root/csrDomain/2020/ca.crt')
    ]
};

mongoose.connect('mongodb://127.0.0.1:27017/mcgusers', { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err)console.log("db error:"+err);
});
    
const connection = mongoose.connection;
    connection.once('open', (err) =>{    
        return console.log('DB is connected');
    }); 






app.post('/login', (req, res) => {
    // console.log('logged in ---------');
    const imoconst = req.body.imo;
    const password = req.body.password;
    const username= req.body.username;
    
    
    userProfiles.findOne({ imo: imoconst }, (err, user) => {
        if (err) { console.error(err); return res.status(404).send({ message: 'Wrong values!' });}
        else if (user){

            // if (user.imo!= imoconst) return res.status(404).send({ message: 'IMO is not valid!' });
            if (user.username != username) return res.status(404).send({ message: 'Username is wrong!' });
            if (user.password != password) return res.status(404).send({ message: 'Password is wrong!' });
            
            //// ADD MESSAGE + USERNAME TO LOG FILE
            console.log("User is: "+user.vesselname+" Date: " +Date());
            res.status(200).send({'sharedUN':user.vesselname});
        }
        else{
            return res.status(404).send({ message: 'IMO is not valid!' });
        }
    });
});




// TO READ FROM NG BUILD--PROD FILES 3
app.use(express.static(path.join(__dirname, '/../dist/customerportal')));




// --------------------------------

router.route('/manual').get((req, res) => {
    // res.status(200).send({ message: "gooddd" });
    res.redirect('/');
});


// -------------------------------------------------------------------------------------- API services call
// GET USER BY IMO
app.get('/api/userslist/:imo',(req, res) => {
    
    userProfiles.findOne ({imo:req.params.imo }, (err, user) => {
        if(err) console.log(Date()+" error userslist API "+err);        
        // res.json({userVessel:user.username});
        res.json(user); 
    });
});

// GET FILE BY IMO ,  SEARCH EACH PATH TO CHECK WHETHER FILE EXISTS OR NOT


app.get('/api/document/:imo',(req,res)=>{
    
    userDocuments.findOne({imo:req.params.imo},(err,document)=>{
        var ex={};
        if(document == null){res.json("user has not found!");}
        else {
            if(err) {console.log(Date()+" error document API "+err); }
            else{
                // TO IGNORE FIELDS OTHER THAN DOCUMENT FROM DB
                var regex=RegExp('^/root');
                var counter=1;
                // ex['docversion']=document.docversion;
                for(let key in document){
                    // console.log(document.docversion);
                    let path='';
                    path=String(document[key]);
                    if(regex.test(path)){
                        // path=path.toLowerCase();
                        let file=fs.readdirSync(path);
                        if(file.length>0) 
                        {
                            // let newaddress=path+file;
                            let newpath=path.replace("/root/project/customerportal/src/assets", "../../assets");
                            // ex.push(newpath+file); 
                            ex["fileloc"+counter]= newpath+file;
                        }
                        else{ex["fileloc"+counter]= "";}
                        counter++;
                    }
                }
                res.json(ex);
            } 
        }
    } );  
});

// -------------------------------------------------------------------------------------- TEST 


//// Register function
// router.route('/register').post((req, res) => {
//     console.log("reached to reg");
//     let registerUser = new userProfiles(req.body);
//     registerUser.imo = req.body.imo;
//     registerUser.email = req.body.email;
//     console.log(req.body);
//     registerUser.password = bcrypt.hashSync(req.body.password);
//     // registerUser.collection.insertOne((imo, email, password), (err)=>{
//     registerUser.save().then(registerUser => {
//         res.status(200).send({ message: 'user saved!' });
//     }).catch(err => {
//         res.status(400).send({ message: 'cant register the user' })
//     });
    //     if (err) return res.status(500).send("Server error!");
    // });
    // registerUser.save().then(
    // res.status(200).json({'answer':'User is Added'})
    // );
// });



//  TO CREATE AND RUN HTTPS SERVER 4
https.createServer(options, app).listen(port, ip);
// http.createServer( app).listen(port, ip);



// ---------------------------- REDIRECT TO HTTPS

http.createServer(function(req,res){    
    // 301 redirect (reclassifies google listings)
    res.writeHead(301,{Location: `https://${req.headers.host}${req.url}`});
    res.end();
}).listen(80);
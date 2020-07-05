const express = require('express');
var StudentModel = require('../models/students');
const router = express.Router();

router.get('/insert', (req,res) => {
  if( req.query.name && req.query.email && req.query.address )
  {
    var newStudent = new StudentModel( {name:req.query.name,email:req.query.email,address:req.query.address});
    newStudent.save((err,data)=>{
        if( err == null ){
          res.statusCode = 200;
          res.json("[{'response':'Insert Success' }]");
        }
        else{
          res.statusCode = 500;
          res.json("[{'response':'Server Error' }]");
        }
    });
  }
});

router.get('/update', (req,res) =>{
  console.log("update req received");
  if( req.query.name && req.query.email && req.query.address )
  {
    StudentModel.findOne( {name:req.query.name},(err,data)=>{
      if( err == null )
      {
        data.name = req.query.name;
        data.email = req.query.email;
        data.address = req.query.address;
    
        data.save((err1)=>{
          if(err1 == null){
            console.log(" Record updated");
            res.statusCode = 200;
            res.json("[{'response':'Update Success' }]");
          }
          else{
            console.log(err1);
            res.statusCode = 500;
            res.json("[{'response':'Server error' }]");
          }
        });
      }
      else
      {
        console.log(err);
        res.statusCode = 500;
        res.json("[{'response':'Server error' }]");
      }
    });
  }
});

router.get('/remove', (req,res) =>{
  if( req.query.name )
  {
    StudentModel.deleteOne({name:req.query.name},(err,data)=>{
      if( err == null )
      {
        res.statusCode = 200;
        res.json("[{'response':'Delete Success' }]");
      }
      else
      {
        console.log(err);
        res.statusCode = 500;
        res.json("[{'response':'Server error' }]");
      }
    });
  }
});

router.get('/fetch', (req,res) =>{
  StudentModel.find( (err,data)=>{
    if( err == null )
    {
      console.log(data);
      res.statusCode = 200;
      res.json(data);
    }
    else
    {
      console.log(err);
      res.statusCode = 500;
      res.json("[{'response':'Server error' }]");
    }
  });
});

module.exports = router
var express = require('express');
var router = express.Router();
var db=require('../database');

const bcrypt = require('bcrypt')
const saltRounds = 10

// to store user input detail on post request
router.post('/register', function(req, res, next) {
    
    inputData ={
		username : req.body.username,
		password: req.body.password,
		phone: req.body.phone,
		last_name: req.body.last_name,
		first_name: req.body.first_name,
		gender:req.body.gender,
    }
// check unique email address
var sql='SELECT * FROM user WHERE username =?';
db.query(sql, [inputData.username] ,function (err, data, fields) {
 if(err){ res.send({
				"code":300,
				"failed":"Something went wrong"
 })}
 if(data.length>0)
 {
	 res.send({
        "code":300,
        "failed":"Email Id already exist"
      });
 }else{
     
    // save users data into database
	bcrypt.hash(inputData.password,saltRounds,(err,hash)=>
	{
		if(err)
		{
			res.send({
				"code":300,
				"failed":"Something went wrong"
			})
		}
		 var sql = 'INSERT INTO user (username,password,first_name,last_name,phone,gender) values(?,?,?,?,?,?)';
   db.query(sql,[inputData.username,hash,inputData.first_name,inputData.last_name,inputData.phone,inputData.gender], function (err, data) {
      if (err) throw err;
           });
		res.send({
        "code":200,
        "success":"Your are successfully registered"
      })
	});
   
		   
 }

})
     
});
module.exports = router;

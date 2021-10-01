var express = require('express');
var router = express.Router();
var db=require('../database');
const bcrypt = require('bcrypt')

const jwt= require('jsonwebtoken');
router.post('/login', function(req, res){
    var emailAddress = req.body.username;
    var password = req.body.password;
    var sql='SELECT * FROM user WHERE username =? ';
    db.query(sql, emailAddress, function (err, data, fields) {
        if(err) { res.send({
				"code":300,
				"failed":"Something went wrong"
			  })
		}
        if(data.length>0){
			
			bcrypt.compare(password,data[0].password,(error,response)=>{
				if(response){
					const id= data[0].id
					const token= jwt.sign({id},"jwtSecret",{
					expiresIn:"1d",
					})
					res.json({auth:true,token:token,result:data});
				}
				else
				{
					 res.json({auth:false,message:"Your Email Address or password is wrong"});
				}
			})
			
				
        }else{
			
			  res.json({auth:false,message:"Your Email Address does not exit."});

        }
    })
})
module.exports = router;

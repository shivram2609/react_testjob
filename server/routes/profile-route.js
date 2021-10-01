var express = require('express');
var router = express.Router();
var multer = require('multer');
const bodyParser = require("body-parser");

var db=require('../database');
const jwt= require('jsonwebtoken');

const verifyJWT=(req,res,next)=>{
	const token=req.headers["x-access-token"]
	if(!token)
	{
		res.send("Token not provided")
	}
	else
	{
		jwt.verify(token,"jwtSecret",(err,decoded)=>{
			if(err){
				res.json({code:300,auth:false,message:"Failed to authenticated"});
			}
			else
			{
				req.userId=decoded.id;				 
				next();
			}
		});
	}
};
router.get("/isUserAuth",verifyJWT,(req,res)=>{
	res.json({code:200,auth:true,message:"congrates authenticated"});
});
router.get('/profile', verifyJWT,(req, res)=>{

    var id = req.userId;
    var sql='SELECT * FROM user WHERE id =?';
    db.query(sql, [id], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
             res.send({
				"code":200,
				"success":data
			  })
        }else{
			 res.send({
				"code":300,
				"failed":"Something went wrong"
			  })
        }
    })
})


// to store user input detail on post request
router.post('/editprofile', verifyJWT,(req, res, next) => {
    
    inputData ={
		username : req.body.username,
		phone: req.body.phone,
		last_name: req.body.last_name,
		first_name: req.body.first_name,
    }
	var id = req.userId;
// check unique email address
var sql='SELECT * FROM user WHERE id =?';
db.query(sql, [id] ,function (err, data, fields) {
 if(err){ res.send({
				"code":300,
				"failed":"Something went wronssssssg"
 })}

 if(data.length > 0)
 {
	 if(inputData.username!=data[0].username)
	 {
		 var sql='SELECT * FROM user WHERE id =? AND username=?';
		db.query(sql, [id,inputData.username] ,function (err, result, fields) {
		 if(err){ res.send({
						"code":300,
						"failed":"Something went wrong"
		 })}
		if(result.length>0)
		{
			res.send({
					"code":300,
					"failed":"Email Id already exit"
			})
		}
		});
	 }
	 var sql = "UPDATE user set first_name =? , last_name =? ,username=?,phone=?  WHERE id = ?";
	db.query(sql, [inputData.first_name,inputData.last_name,inputData.username,inputData.phone,id] ,function (err, result, fields) {
		 if(err){ res.send({
						"code":300,
						"failed":"Something went wrong"
		 })}
		if(result)
		{
			res.send({
					"code":200,
					"success":"Profile updated successfully"
			})
		}
		else
		{
			res.send({
					"code":300,
					"failed":"Something went wrong"
			})
		}
	});
 }else{
     
    res.send({
        "code":300,
        "failed":"Something went wrong"
      })
		   
 }

})
     
});


// to store user input detail on post request
router.post('/editaddress', verifyJWT,(req, res, next) => {
    
    inputData ={
		city : req.body.city,
		state: req.body.state,
		country: req.body.country
    }
	
	var id = req.userId;
// check unique email address
var sql='SELECT * FROM user WHERE id =?';
db.query(sql, [id] ,function (err, data, fields) {
 if(err){ res.send({
				"code":300,
				"failed":"Something went wrong"
 })}

 if(data.length > 0)
 {
	var sql = "UPDATE user set city =? , state =? ,country=? WHERE id = ?";
	db.query(sql, [inputData.city,inputData.state,inputData.country,id] ,function (err, result, fields) {
		 if(err){ res.send({
						"code":300,
						"failed":"Something went wrong"
		 })}
		if(result)
		{
			res.send({
					"code":200,
					"success":"Address updated successfully"
			})
		}
		else
		{
			res.send({
					"code":300,
					"failed":"Something went wrong"
			})
		}
	});
 }else{
     
    res.send({
        "code":300,
        "failed":"Something went wrong"
      })
		   
 }

})
     
});

// to store user input detail on post request
 const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination:  function (req, file, cb) { 
        cb(null, "../server/images"); // Static route to save images
        
    }, 
      filename: (req, file, cb) => {
		  const ext = file.mimetype.split("/")[1];
          cb(null, file.fieldname + '_' + Date.now()+ file.originalname)
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
			
    }
	
});
 
const imageUpload = multer({
      storage: imageStorage,
      limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
      },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
           // upload only png and jpg format
		   
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
}) 
 
router.post('/uploadprofileimage', verifyJWT, imageUpload.single('profile_image'),(req, res, next) => {
 
   var image=req.file.path;
	var id = req.userId;
	// check unique email address
	var sql='SELECT * FROM user WHERE id =?';
	db.query(sql, [id] ,function (err, data, fields) {
	 if(err){ res.send({"code":300,"failed":"Something went wrong"})}

	 if(data.length > 0)
	 {
		var sql = "UPDATE user set image =? WHERE id = ?";
		db.query(sql, [image,id] ,function (err, result, fields) {
			if(err){
				 res.send({"code":300,"failed":"Something went wrong"})
			}
			if(result)
			{
				res.send({"code":200,"success":"Profile Image updated successfully"})
			}
			else
			{
				res.send({"code":300,"failed":"Something went wrong"})
			}
		});
	 }
	 else{     
		res.send({"code":300,"failed":"Something went wrong"})
			   
	 }

	})
     
});


module.exports = router;

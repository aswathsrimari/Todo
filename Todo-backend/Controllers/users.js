const User = require('../Models/users')
const jwt = require('jsonwebtoken') // to generate signed token
const expressJwt = require('express-jwt') // for authorization check

exports.signup = (req,res)=>{
    console.log(req.body);
    const user = new User(req.body);

    //save email and hashed password in the database
    user.save((err,user)=>{
        
        if(err){
            return res.status(400).json({
                error:"signup failed"
            })
        }

        user.salt = undefined
        user.hashed_password = undefinederr
        res.json({
            user
        })
    });
};

exports.signin = (req,res)=>{
    //find user based on email
    const {email,password} = req.body
    User.findOne({email},(err,user)=>{
        if(err || !user || !user.authenticate(password)){
            return res.status(400).json({
                error:"Email or password invalid. SignUp"
            });
        }
        console.log("userid");
        console.log(user._id);
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
        res.cookie('token',token,{expire: new Date()+9999})
        const {_id,email} = user
        res.json({token,user:{_id,email}})
    })


};

exports.signout = (req,res)=>{
    res.clearCookie("token")
    res.json({message:"Signout successful"})
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"

});

exports.userByID = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user;
        next();
    })
}
exports.isAuth = (req,res,next)=>{
    let n = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!n){
        return res.status(403).json({
            error:"Access denied"
        })
    }
    next();
}
const mongoose = require('mongoose')
const crypto = require('crypto')
const {v1:uuidv1} = require('uuid')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        trim : true,
        required: true,
        unique: 32,
        validate: (value)=>{
            return validator.isEmail(value);
        }
    },
    hashed_password:{
        type : String,
        required: true,
    },
    salt: String

},
{timestamps: true});


//virtual field
UserSchema.virtual('password')
.set(function(password){
    this._password = password,
    this.salt = uuidv1(),
    this.hashed_password = this.encryptPassword(password)
})
.get(function(password){
    return this._password;
});

//the password is encrypted using sha1
UserSchema.methods = {

    authenticate: function(plaintext){
        return this.encryptPassword(plaintext)==this.hashed_password;
    },

    encryptPassword: function(password){
        if(!password){
            return '';
        }
        try{
            return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
        } catch(err){
            return "";
        }

    }
    
};

module.exports = mongoose.model('User',UserSchema);
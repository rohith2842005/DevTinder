const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: String,
    userid: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_]+$/.test(v);
            },
            message: props => `${props.value} is not a valid userid! Only alphanumeric characters and underscores are allowed.`

        },
        minlength: 3,
        maxlength: 30
    },
    emailid:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate:{
            validator:function(v){
                return validator.isEmail(v);
            },
            message:props=>`${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function (v) {
                return !v.toLowerCase().includes("password");
            },
            message: props => `Password should not contain the word "password".`
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
        validate: {
            validator: Number.isInteger,
            message: props => `${props.value} is not an integer value!`
        }   
    },
    gender: String,
    skills: [String],
    bio: {
        type: String,
        maxlength: 500,
        default: "This user prefers to keep an air of mystery about them.",
        trim: true,
        validate: {
            validator: function (v) {
                return v.split(" ").length <= 100;
            },
            message: props => `Bio should not exceed 100 words.`    
        }
    }
},
{ timestamps: true });
const User = mongoose.model('user', userSchema);
module.exports = User;

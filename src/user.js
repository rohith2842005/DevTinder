const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    userid: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_]+$/.test(v);
            },
            message: props => `${props.value} is not a valid userid! Only alphanumeric characters and underscores are allowed.`

        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,
        min: 18
    },
    gender: String,
    skills: [String],
    bio: {
        type: String,
        maxlength: 500,
        default: "This user prefers to keep an air of mystery about them."
    },

},
    { timestamps: true });
const User = mongoose.model('user', userSchema);
console.log(mongoose);
module.exports = User;
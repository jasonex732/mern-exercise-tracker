const mongoose = require('mongoose');

const Schema = mongoose.Schema; //starts as a schema same

const userSchema = new Schema ({
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true, //trims white space
        minlength: 3 
    },
}, {
    timestamps: true,
});

const User = mongoose.model('theUser', userSchema);

module.exports = User;
// MAKE A VIRTUAL friendCount THAT GETS THE LENGTH OF [friends] ON QUERY

const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

//schema for User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //require validation
        },
        thoughts: [thoughtSchema],
        friends: [userSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

//make a User model from the userSchema
const User = model('user', userSchema);

//export model
module.exports = User;
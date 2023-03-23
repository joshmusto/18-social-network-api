const { Schema, model } = require('mongoose');
const Thought = require('./Thought')

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
        thoughts: [Thought.schema],
        friends: [this],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

//virtual property 'friendcount'
userSchema
    .virtual('friendcount')
    //getter
    .get(function () {
        return this.friends.length;
    })

//make a User model from the userSchema
const User = model('user', userSchema);

//export model
module.exports = User;
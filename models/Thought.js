const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//schema for User model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // GETTER METHOD TO FORMAT TIMESTAMP ON QUERY
        },
        username: {
            type: String,
            reqiured: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

//virtual property 'reactioncount'
thoughtSchema
    .virtual('reactionCount')
    //getter
    .get(function () {
        return this.reactions.length;
    })

//make a User model from the userSchema
const Thought = model('thought', thoughtSchema);

//export model
module.exports = Thought;
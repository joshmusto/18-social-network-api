//Not a model, just used as a subdocument schema in Thought model

const { Schema } = require('mongoose');

//schema for User model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,
            default: ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username:{
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // USER GETTER METHOD TO FORMAT TIMESTAMP ON QUERY
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);
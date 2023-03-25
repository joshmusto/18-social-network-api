const { ObjectId } = require('mongoose').Types;
const { User, Thought, } = require('../models');

//export functions to be easily called in routes/api files
module.exports = {
    //GET all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //GET one thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(async (thought) => 
                !thought
                    ? res.status(404).json({ message: 'There is no thought with that ID '})
                    : res.json({
                        thought,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //POST new thought
    newThought(req, res) {
        Thought.create(req.body)
            .then((thought) => User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought } }
            ))
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    //PUT update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { thoughtText: req.body.thoughtText }
        )
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: 'There is no thought with that ID' })
                : res.json({ message: 'Thought has been updated' })
            )
            .catch((err) => res.status(500).json(err));
    },
    //DELETE thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought  
                    ? res.status(404).json({ message: 'There is no thought with that ID' })
                    : res.json({message:'Thought has been deleted'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    //POST reaction
    newReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body}}
        )
            .then((reaction) => res.json(reaction))
            .catch((err) => res.status(500).json(err));
    },
    //DELETE reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {_id: req.params.reactionId} }},
            { runValidators: true, new: true }
        ) 
            .then((reaction) => {
                !reaction  
                    ? res.status(404).json({ message: 'There is no reaction with that ID' })
                    : res.json({message:'Reaction has been deleted'})
    })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    }
}
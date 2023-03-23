const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

//export functions to be easily called in routes/api files
module.exports = {
    //GET all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //GET one user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) => 
                !user
                    ? res.status(404).json({ message: 'There is no user with that ID' })
                    : res.json({
                        user,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //POST new user
    newUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //PUT update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { username: req.body.username }
        )
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'There is no user with that ID '})
                : res.json({ message: 'User has been updated '})
            )
            .catch((err) => res.status(500).json(err));
    },
    //DELETE user and remove thoughts by the user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => 
                !user  
                    ? res.status(404).json({ message: 'There is no user with that ID' })
                    : Thought.deleteMany(
                        { username: user.username }
                    )
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    //POST to add user to friends list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId} }
        )
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'There is no user with that ID '})
                : res.json({ message: 'User has been added to friends list'})
            )
            .catch((err) => res.status(500).json(err));
    },
    //DELETE to remove user from friends list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'There is no user with that ID '})
                : res.json({ message: 'User has been removed from the friends list'})
            )
            .catch((err) => res.status(500).json(err));
    }
}
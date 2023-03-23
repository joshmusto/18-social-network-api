const router = require('express').Router();
//import api functions from controllers/userController
const {
    getUsers,
    getOneUser,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controlers/userController');

// /api/users
//GET shows all users, POST makes a new user
router.route('/').get(getUsers).post(newUser);

// /api/users/:userId
//GET shows the user info, DELETE removes the user
router.route('/:userId').get(getOneUser).delete(deleteUser);

// /api/users/:userId/username
//POST updates username for the user
router.route('/:userId/username').post(updateUser);

// /api/users/:userId/friends/:friendId
//POST adds user to friends list, DELETE removes user from friends list
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
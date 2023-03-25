const router = require('express').Router();
//import api functions from controllers/thoughtController
const {
    getThoughts,
    getOneThought,
    newThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
//GET shows all thoughts, POST makes new thought
router.route('/').get(getThoughts).post(newThought);

// /api/thoughts/:thoughtId
//GET shows a single thought, PUT updates thought, DELETE removes thought
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
//POST adds new reaction
router.route('/:thoughtId/reactions').post(newReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
//DELETE removes reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
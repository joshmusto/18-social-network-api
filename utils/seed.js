const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getUsername, getEmail, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Now connected...');

    //drop current thoughts from database
    await Thought.deleteMany({});
    //drop current users from database
    await User.deleteMany({});

    //create empty arrays for user data and thought data
    const userData = [];
    const thoughtData = [];
    //generate randomized data
    for (let i=0; i<5; i++) {
        const username = getUsername(i);
        const email = getEmail(i);
        const thoughts = getRandomThoughts(3);
        //push into userData
        userData.push({
            username,
            email,
            thoughts,
        });
        //for loop to push individual thoughts to thoughtData
        for (let j=0; j<2; j++) {
            const thoughtText = thoughts[j];
            thoughtData.push({
                thoughtText,
                username,
            });
        }
    }

    //add users array to collection
    await User.collection.insertMany(userData);
    //add thoughts to collection
    await Thought.collection.insertMany(thoughtData);

    //log out seed data
    console.table(userData);
    console.info('Seeding complete');
    process.exit(0);
});
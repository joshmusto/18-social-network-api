const usernames = [
    'mrfantastic',
    'guff',
    'banana_bloat',
    'thimble',
    'mrfantastic2',
];

const emails = [
    'email@mail.com',
    'mail@mail.net',
    'postage@mail.org',
    'coolguy@mail.com',
    'stamp@mail.org',
    'mailbox@mail.com',
    'envelope@mail.net',
    'package@mail.org',
    'slurmp@mail.com',
    'snail@mail.net',
]

const thoughts = [
    "What's up with airline food?",
    "having a bad day :(",
    "I super duper <3 social media",
    "cry me a river",
    "Epilogue, more like EPIClogue",
    "thinking about taking up tap dancing",
    "shenanigans and hullaballoo",
    "eat a thousand buckets of paint",
    "So long, and thanks for all the fish",
    "My cat hasn't moved from my bed all day. What a punk",
    "Full House is a nostalgiac product of its time",
    "Don't even get me started on Fuller House",
    "What ever DID happen to predictability?",
    "The milkman, the paper boy? Evening TV?",
    "asdflkjfda million places, WAITING JUST AROUND THE BEEEEEEND",
];

//get random item in array
const getRandomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];

//get random username
const getUsername = (int) => {
    return usernames[int];
}

//get random email
const getEmail = (int) => {
    return emails[int];
}

//generate random thoughts for each user
//int being used to denote how many thoughts you want each user to be seeded with
const getRandomThoughts = (int) => {
    const results = [];
    for (let i=0; i<int; i++) {
        results.push(getRandomArrayItem(thoughts));
    }
    return results;
};

//export functions for use in seed.js
module.exports = { getUsername, getEmail, getRandomThoughts };
const cron = require('node-cron');
const User = require('../model/UserModel');
const sendEmail = require('./email');

function start() {
    console.log('Cron job started');
    cron.schedule('* * * * *', async () => {

        const today = new Date();
        today.toISOString().slice(0, 10);
        const users = await User.find({ birthday: { $eq: today.toISOString().slice(0, 10) } });

        // console.log(users);
        const message = `Happy birthday to you! Happy birthday to you! Happy birthday dear ${users[0].username}! Happy birthday to you`;

        console.log('Sending email to', users.length, 'users');
        users.forEach(user => {
            sendEmail(message, user);
        });

    });
}


module.exports = { start };
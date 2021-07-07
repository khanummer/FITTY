const mongoose = require('mongoose');

// For testing; was not able to connect to database with the other connection string - Akshay
const connectionString = 'mongodb://localhost/fitty';
// const connectionString = process.env.DATABASE_URL

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('mongoose connected to ', connectionString);
})

mongoose.connection.on('error', err => {
    console.log('mongoose error' , err);
})

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected from ', connectionString);
})
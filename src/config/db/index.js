const mongoose = require('mongoose');

async function connect(){

    try{
        await mongoose.connect('mongodb://localhost:27017/mern_shopping_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('successfully!!!');
    }
    catch (error){
        console.log('failure!!!');
    }
}

module.exports = {connect};
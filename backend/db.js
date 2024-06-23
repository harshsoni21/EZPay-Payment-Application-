const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/paytm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error', err);
});


const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        require : true
    },
    lastname : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
})

const User = mongoose.model("User",userSchema);

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    balance :{
        type : Number,
        require : true
    }
})

const Account = mongoose.model("Account",accountSchema);

module.exports = {
    User,
    Account
}
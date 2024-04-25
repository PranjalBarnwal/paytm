import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/paytmBackend");

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
})

const User= mongoose.model('User',userSchema);

const bankSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, // Reference to User model (like foreign keys in SQL)
        ref: 'User',
        required: true
    },
    balance:{
        type:Number,
        required:true
    }
});

const Account=mongoose.model("Account",bankSchema);

export {User,Account};
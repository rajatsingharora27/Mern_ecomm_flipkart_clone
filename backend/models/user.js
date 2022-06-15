const mongoose=require('mongoose');
const bcrypt=require('bcrypt');



const userSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },

    middleName:{
        type:String,
        trim:true,
        min:3,
        max:20
    },

    lastName:{
        type:String,
        trim:true,
        min:3,
        max:20
    },

    userName:{
        required:true,
        type:String,
        trim:true,
        min:3,
        max:20,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },

    hash_password:{
        required:true,
        type:String
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'admin'
    },
    contactNumber:{
        type:String,

    },
    profilePicture:{
        type:String
    }
},{timestamps:true});

userSchema.virtual('password')
.set(function(password){
    this.hash_password=bcrypt.hashSync(password,10);
})

userSchema.methods.authenticate = function(password){
    return bcrypt.compareSync(password, this.hash_password);
}



module.exports=mongoose.model('User',userSchema)
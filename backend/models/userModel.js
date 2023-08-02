import mongoose from "mongoose";
import bcrypt from "bcryptjs";
;

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps:true
});
//middleware(needs next)
//Here .this means 'user' that we created in registerUser controllerr

userSchema.pre('save',async function(next){
    //if password is not modifies
    if(!this.isModified('password')){
        next();
    }
    //else case: password first time creation or modified
    //salt is like a key to encrypt password and gensalt takes no of characters used (in this case 10)
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);


})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User',userSchema);
export default User; 
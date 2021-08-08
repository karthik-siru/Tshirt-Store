const mongoose =  require("mongoose");
var Schema  = mongoose.Schema;

var userSchema = new Schema({

    name : {
        type :String ,
        required : true ,
        maxLength : 32,
        trim :true 
    },

    lastName :{
        type : String ,
        maxLength :32  ,
        trim :  true 
    },

    email  :{
        type : String ,
        maxLength : 100 ,
        required : true ,
        unique : true 
    },

    userinfo : {
        type :String ,
        trim : true 
    },

    // work TODO here
    password : {
        type :String ,
        trim :true 
    },
    salt : String ,

    role : {
        type : Number ,
        default : 0
    },
    purchases : {
        type : Array ,
        default : []
    }

});


// now we have to export the schema .                                
                            // how to call , schema 
module.exports =  mongoose.model("User" ,userSchema );
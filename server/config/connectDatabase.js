const mongoose=require("mongoose");
require("dotenv").config();
exports.dbConnect=()=>{
    
        mongoose.connect(process.env.DATABASE_URL)
        .then(()=>{
            console.log("Successfully Connected to DB")

        })
        .catch((error)=>{
            console.log("Can't Connect to DB, Something went wrong");
            console.log(error);
            process.exit(1);
        })
    
}
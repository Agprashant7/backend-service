const mongoose=require('mongoose');
const connection= mongoose.connect(process.env.MONGO_URL, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
const connectDB=()=>{
    if(connection){
        console.log(`Connected to DB`,connection)
        return connection
    }
    console.log("Error while connecting DB")
   
}
    useUnifiedTopology: true

module.exports=connectDB
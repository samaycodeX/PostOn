import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const ConnectionDB  = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to mongodb : `, ConnectionDB.connection.host, ' MONGO_DB connected Succesfully');
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default ConnectDB
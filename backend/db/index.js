import mongoose from "mongoose";

const connectDB = async () => {
 
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`\n MongoDb connect DB HOST ${conn.connection.host}`);
    } catch (error) {
        console.log("MonogDB connection failed", error);
        process.exit(1)
    }
}


export default connectDB
import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const DBConnect = async () => {
     try{
          console.log("HI");
          const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
          console.log(`MONGO DB Connection established \n DB Host : ${connectionInstance.connection.host}`)
     }catch(error){
          console.error(`MongoDB Connection Error : `,error);
          process.exit(1)
     }
}

export default DBConnect;
import mongoose from "mongoose";


const dbConnetion = async () => {
    try {
        await mongoose.connect(`mongodb+srv://userAuth:userAuthData@user-auth.oazvn.mongodb.net/`, { useUnifiedTopology: true });
        console.log("database connected");

    } catch (error) {
        console.log(error);

    }
}

export default dbConnetion;
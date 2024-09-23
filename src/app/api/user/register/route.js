import dbConnetion from "@/database/db"
import User from "@/database/schema";




export const POST = async (NextRequest) => {
    try {
        dbConnetion();
        const body = await NextRequest.json();
        if (!body.name || !body.username || !body.password) {
            return new Response("name,username,password are required", { status: 400 })
        }
        const uniqueUsername = await User.findOne({username:body.username});
        // console.log("uniqueUsername",uniqueUsername);
        if(uniqueUsername){
            return new Response("Username is already exist", {status:401})
        }
        
        const newUser = new User({
            name: body.name,
            username: body.username,
            password: body.password
        })

        await newUser.save();
        console.log(newUser);
        return new Response("Data successfully inserted", { statuscode: 200 })
    } catch (error) {
        console.log(error);

    }


}
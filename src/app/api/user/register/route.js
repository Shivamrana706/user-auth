import dbConnetion from "@/database/db"
import User from "@/database/schema";




export const POST = async (NextRequest) => {
    try {
        dbConnetion();
        const body = await NextRequest.json();
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
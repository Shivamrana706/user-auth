import dbConnetion from "@/database/db"
import User from "@/database/schema";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";



export const POST=async(NextRequest)=>{

        dbConnetion()
        try {
            const body = await NextRequest.json();
            if(!body.username || !body.password){
                return new Response("All feild are required",{status:401})
            }
            const databaseData = await User.findOne({username:body.username,password:body.password});
            if(databaseData){
                 return new Response("logged in",{status:200})
            }
            if(!databaseData){
                return new Response('User not found', {status:400})
            }
        } catch (error) {
            console.log(error);
            
        }
    } 
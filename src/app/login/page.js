"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";





const Login = () => {
    const route = useRouter();
    const [alert,setAlert] = useState('')
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    function onValueChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
        setAlert('')



    }
    async function  onSubmitButton(e) {
        e.preventDefault()
        if (!data.username || !data.password){
            setAlert("Please fill all the fields");
            return
        }

        try {
            const response = await axios.post('api/user/login',data);
            if(response.status ==200){
                route.push('/profile')
            }
        } catch (error) {
            console.log(error)
            if(error.status == 400){
                setData({
                    username: '',
                    password: ''
                })
                setAlert('Wrong username or password')

            }
        }
    }
    return (
        <div className="bg-gray-400 h-screen flex justify-center items-center">
               <div className="bg-white flex-col flex justify-center items-center border  rounded-lg py-6 px-14">
               <h1 className="text-3xl font-bold w-full flex justify-center rounded-sm py-2 px-2">Login</h1>
                <form className="flex flex-col">
                    <label className="text-black mt-2 text-xl">Username </label>
                    <input type="text" className="bg-white border mt-1 text-xl py-2  rounded-md px-2" name="username" value={data.username} onChange={(e) => onValueChange(e)} />
                    <label className="mt-2 text-xl">Password </label>
                    <input type="password" className="bg-white border mt-1 text-xl py-2 rounded-md px-2" name='password' value={data.password} onChange={(e) => onValueChange(e)} />
                    {alert?<p className="text-red-500 mt-2 text-xl">{alert}</p>:null}
                    <button className="bg-blue-500 rounded-full mt-4 py-2 px-2 hover:bg-blue-700 text-white text-2xl" onClick={(e) => onSubmitButton(e)} >Submit</button>
                </form>

                <p className="mt-3">Don't have an account?&nbsp;
                    <Link href='/register' className="text-blue-500 hover:underline"  >Register</Link></p>

            </div>
        </div >
    )
}
export default Login;
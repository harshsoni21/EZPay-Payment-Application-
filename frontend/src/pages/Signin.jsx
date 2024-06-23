import Heading from "../components/Heading"
import BottomWarning from "../components/BottomWarning"
import { Button } from "../components/Button"
import InputBox from "../components/InputBox"
import Subheading from "../components/Subheading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"



export const Signin = () => {
  const navigator = useNavigate();
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');

 const handleSubmit = async () =>{
  try {
    const response = await axios.post(`http://localhost:3000/api/v1/user/signin`,{
      email,
      password
    })
  localStorage.setItem("token",response.data.token);
  navigator("/dashboard");
  } catch (error) {
    console.log(error);
  }
 }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <Subheading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e)=>{
          setEmail(e.target.value)
        }} placeholder="user@gmail.com.com" label={"Email"} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value)
        }}
        placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={handleSubmit} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}
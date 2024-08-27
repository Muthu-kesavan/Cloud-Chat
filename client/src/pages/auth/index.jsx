import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import { useState } from "react"
import { toast } from "sonner"
import {apiClient} from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const validateSignup=()=>{
    if (!email.length) {
      toast.error("Email is Required");
      return false;
    }
    if (!password.length){
      toast.error("Password is Required");
      return false;
    }
    if (password !== confirmPassword){
      toast.error("password and confirm password need to be same");
      return false;
    }
    return true;
  };

  const validateLogin =()=>{
    if (!email || !password){
      toast.error("Enter your Credentials");
      return false
    }
    return true;
  }

  const handleSignup = async()=> {
    if (validateSignup()){
      const res = await apiClient.post(SIGNUP_ROUTE, {email, password},{withCredentials: true} );
      if (res.status === 201){
        navigate('/profile');
      }
      console.log(res);
    }
  };
  
  const handleLogin = async()=> {
    if (validateLogin()){
      const res = await apiClient.post(LOGIN_ROUTE, {email, password},{withCredentials: true});
      console.log(res);
      if (res.data.user.id){
        if (res.data.user.profileSetup){
          navigate('/chat');
        }else{
          navigate('/profile');
        }
      }
    }
  };


  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
    <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70wv] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 ">
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex items-center justify-center flex-col">
          <div className="flex items-center justify-center">
          <img src="src/assets/waving-hand.png" alt="emoji" className="h-[100px]"></img>
            <h1 className="text-5xl font-bold md:text-6xl"> Welcome</h1>
          </div>
          <p className="font-medium text-center">Let's Get Started with CLOUD-CHAT</p>
        </div>
        <div className="flex items-center justify-center w-full">
          <Tabs className="w-3/4" defaultValue="login">
            <TabsList className="bg-transparent rounded-none w-full">
              <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]: text-black data-[state=active]: font-semibold data-[state=active]:border-b-black p-3 transition-all duration-300 ">Login</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]: text-black data-[state=active]: font-semibold data-[state=active]:border-b-black p-3 transition-all duration-300 ">Signup</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col gap-5 mt-10" value="login">
              <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={e=>setEmail(e.target.value)}></Input>
              <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={e=>setPassword(e.target.value)}></Input>
              <Button className="rounded-full p-6" style={{ backgroundColor: '#C209C1', color: 'white' }}  onClick={handleLogin}>Login</Button>
            </TabsContent>
            <TabsContent className="flex flex-col gap-5" value="signup">
            <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={e=>setEmail(e.target.value)}></Input>
            <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={e=>setPassword(e.target.value)}></Input>
            <Input placeholder="Confirm Password" type="password" className="rounded-full p-6" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}></Input>
            <Button className="rounded-full p-6" style={{ backgroundColor: '#C209C1', color: 'white' }}  onClick={handleSignup}>Sign up</Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hidden xl:flex justify-center items-center">
        <img src="src/assets/bgimage2.webp" alt="background image" className="h-[500px] rounded-md"></img>
      </div>
    </div>
    </div>
  )
}

export default Auth
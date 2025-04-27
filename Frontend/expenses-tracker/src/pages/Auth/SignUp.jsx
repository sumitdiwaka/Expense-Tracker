import React, {  isValidElement, useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImages';
 
const SignUp = () => {
  const [profilePic, setProfielPic] = useState(null);
  const [fullName, setFullNme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const [success, setSuccess] = useState(null); 

  const navigate = useNavigate();
  //Handle Sign Up form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName){
      setError("Please enter your full name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter your email");
      return;
  }
  if(!password){
    setError("Please Enter The Password");
    return;
  }
  setError('')
  setSuccess('')
  //Sign Up API Call
  try{

    //Upload Image If Present
    if(profilePic){
      const imgUploadRes = await uploadImage(profilePic);
      profileImageUrl = imgUploadRes.imageUrl || "";
      }

    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
      fullName,
      email,
      password,
      profileImageUrl
    });
    const {token,user} = response.data;
    if(token){
      setSuccess("Signup successful! Please login.");
      localStorage.setItem("token",token);
      updateUser(user);
      setTimeout(() => {
        navigate("/login");  // ✅ after 2 sec
      }, 2000);
      // navigate("/login");
    }
  }catch(error){
    if(error.response && error.response.data.message){
      setError(error.response.data.message);
    }else{
      setError("Something went wrong,Please Try again");
    }
    console.log(error)
  }
}


  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create An Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>join Us Today By Entering Your Details Below</p>
    
      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfielPic}/>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
          value={fullName}
          onChange={({ target}) => setFullNme(target.value)}
          label="Full Name"
          placeholder="John"
          type="text"
          />

            <Input value={email}
          onChange={({target}) => setEmail(target.value)} 
          label="Email Address"
          placeholder='john@example.com'
          type='text'
           />
            
            <div className='col-span-2'>
             <Input value={password}
          onChange={({target}) => setPassword(target.value)} 
          label="Password"
          placeholder='Min 8 Characters'
          type='password'
           />
           </div>
        </div>
          {/* ✅ SUCCESS MESSAGE */}
          {success && <p className='text-green-500 text-xs pb-2.5'>{success}</p>}
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                   <button type='submit' className='btn-primary'>
                    SIGN UP
                   </button>
                   <p className='text-[13px] text-slate-800 mt-3'>
                    Already Have An Account?{" "}
                    <Link className='font-medium text-primary underline' to='/login'>
                    Login
                    </Link>
                   </p>
      </form>
      </div>
      
    </AuthLayout>
  )
}

export default SignUp

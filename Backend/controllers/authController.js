const User = require('../models/User')
const jwt = require('jsonwebtoken')

//Generate JWT Token
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET, { expiresIn: '1h'
        });
};
const frontend_Url = "https://expense-tracker-1-yqg5.onrender.com"
//Register User
const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl} = req.body;

    // Validation Check: For Missing Fields
    if(!fullName || !email || !password){
        return res.status(400).json({message: "Please Fill In All Fields (Are Required)."})
    }
    try{
        // Check If Email Already Exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({msg: "Email Already Exists."})
            }
            // Create The User
            const user = await User.create({
                fullName,
                email,
                password,
                profileImageUrl,
                });
                res.status(201).json({
                    id:user._id,
                    user,
                    token: generateToken(user._id)
                })
    }
    catch(err){
        res.status(500).json({
            message: "Error Occurred While Creating User",error:err.message
        })
        console.log(err)
    }
};

//Login  User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({msg: "Please Fill In All Fields (Are Required"
            })
    }
    try{
        const user = await User.findOne({email});
        if(!user || !(await user.ComparePassword(password)))
            {
                return res.status(400).json({msg: "Invalid Email or Password."})
                }
                res.status(200).json({
                    id:user._id,
                    user,
                    token: generateToken(user._id)
                });
                }
                catch(err){
                    res.status(500).json({
                        message: "Error Occurred While Logging In User",
                        error:err.message
                        })
                        console.log(err)
                       }    
}

// Get User
const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({msg: "User Not Found."})
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({msg: "Error Occurred While Getting User Info", 
            error :err.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserInfo
  };

const jwt = require('jsonwebtoken')
const User = require('../models/User');

exports.protect = async(req,res,next)=>{
    let token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({msg:"Please login to access this route, Not Authorized No Token"})
    }
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(err){
            return res.status(401).json({msg:"Not Authorized, Invalid Token"})
            }
        }


// exports.protect = async (req, res, next) => {
//     let token;
  
//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }
  
//     if (!token) {
//       return res.status(401).json({ msg: "Not Authorized, No Token Provided" });
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (err) {
//       return res.status(401).json({ msg: "Not Authorized, Invalid Token" });
//     }
//   };
  
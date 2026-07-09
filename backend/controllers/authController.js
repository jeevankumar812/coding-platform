import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const generateToken = (id,role)=>{
    return jwt.sign(
        {id,role},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
};


export const registerUser = async(req, res)=>{
    try {
        const {name,email,password}=req.body;

        if(!email || !name|| !password)
        {
            return res.status(400).json({
                success:false,
                message:"Fill all required field"
            });
        }

        if(password.length<6)
        {
            return res.status(400).json({
                success : false,
                message:"Password must be at least 6 characters"
            });
        }


        const userExit = await User.findOne({email: email.toLowerCase()});
        if(userExit)
        {
            return res.status(400).json({
                success:false,
                message: "Email already exist"
            });
        }

        const hashedPassword = await bcryptjs.hash(password,10);

        const newUser = await User.create({
            name,
            email:email.toLowerCase(),
            password:hashedPassword,
            role:"user",
            totalPoints:0,
            availablePoints:0
        });
        
        const token = generateToken(newUser._id,newUser.role);

        const user = await User.findById(newUser._id).select("-password");

        return res.status(201).json({
            success:true,
            message:"Registration Succesful",
            token,
            user
        });

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}


export const loginUser = async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user = await User.findOne({email:email.toLowerCase()});

        if(!user)
        {
            return res.status(404).json(
                {
                    success:false,
                    message:"User not found"
                }
            );
        }

        const check = await bcryptjs.compare(password,user.password);

        if(!check)
        {
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            });
        }

        const token = generateToken(user._id,user.role);

        const userData = await User.findById(user._id).select("-password");

        res.status(200).json({
            success:true,
            message:`Welcome ${user.name}`,
            token,
            user:userData,
        });

    } catch (error) {
        res.status(500).json({
            success:true,
            message:"Internal Server Error",
            error:error.message
        });
    }
}


export const logoutUser = async(req,res)=>{
    try {
        return res.status(200).json({
            success:true,
            message:"Logout Successful"    
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

export const getProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password");

        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

     res.status(200).json({
        success:true,
        user
     })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server Error",
            error: error.message
        });
    }
}

export const updateProfile = async(req,res)=>{
    try {
        const {name,email}=req.body;

        const user = await User.findById(req.user._id);

        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        if(email && email != user.email)
        {
            const existingUser = await User.findOne({email :email.trim().toLowerCase()});

            if(existingUser)
            {
                return res.status(400).json({
                success:false,
                message:"User already exist"
                });
            }
        }

        user.email = email.trim().toLowerCase();

        if(name)
        {
            user.name = name;
        }

        await user.save();

        const updateUser = await User.findById(user._id).select("-password");

        res.status(200).json({
            success:true,
            message:"Profile Updated",
            user:updateUser
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server Error",
            error : error.message
        });
    }
}

export const changePassword = async(req,res)=>{
    try {
        const {currentPassword,newPassword}=req.body;

        if(!currentPassword || !newPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Please fill both Fields"
            });
        }

        if(newPassword.length<6)
        {
            return res.status(400).json({
                success:false,
                message:"Password must be atleast 6 character"
            });
        }


        const user = await User.findById(req.user._id);

        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const isMatch = await bcryptjs.compare(currentPassword,user.password);
        if(!isMatch)
        {
            return res.status(400).json({
                success:false,
                message:"Current password is incorrect"
            });
        }

        const hashedPassword = await bcryptjs.hash(newPassword,10);

        user.password = hashedPassword;

        await user.save();
        
        res.status(200).json({
            success:true,
            message:"Password is updated"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server Error",
            error :error.message
        })
    }
}
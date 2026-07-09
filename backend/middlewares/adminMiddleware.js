 const adminOnly = async(req,res,next)=>{
    try {
        if(!req.user)
        {
            return res.status(401).json({
                success:false,
                message : "Unauthorized"
            });
        }

        if(req.user.role!="admin")
        {
            return res.status(403).json({
                success:false,
                message:"Admin Access Only"
            });
        }
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
}

export default adminOnly;
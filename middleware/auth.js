const User = require("../model/user");
const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    try{
        const  token  = req.cookies.token;

            if(!token){
                throw new Error("Token is not Valid!!!")
            }
            // Validate the token
            const decodedObj = await jwt.verify(token, 'sigma@12345')
        
            const {_id} = decodedObj;
            // Find The User
            const user = await User.findById(_id);
            if(!user){
                throw new Error("user not Found");
                
            }
            req.user = user; //Attaching user to request
            next()

    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
}

module.exports = { userAuth };
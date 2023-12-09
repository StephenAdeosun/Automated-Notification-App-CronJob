const userSchema = require('../model/UserModel');

const register = async (req, res) => {
    const {username, email, birthday} = req.body;
    try {
        const existingUser = await userSchema.findOne({email});
        if(existingUser){
            return res.status(409).json({
                status: "error",
                message: "User already exists"
            })
        }
        const user = await userSchema.create({
            username,
            email,
            birthday
        })
        return res.status(201).json({
            status: "success",
            message: "User successfully created",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
};

module.exports = {register}
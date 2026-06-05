import db from "../models/index.js";
const {User} = db;
export const createUserController = async(req, res) =>{
    try {
        const {name, email} = req.body;
        if(!name || !email){
            return res.status(400).json({
                message : "Name and email are required"
            })
        }
        const user = await User.create({
            name,
            email
        })
        return res.status(201).json({
            message : "user created",
            user
        })  
    } catch (error) {
        return res.status(400).json({
            message : "Error while creating user",
            error
        })
    }
}
export const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find({});
        return res.status(200).json({
            message : "Users fetched successfully",
            users
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error while fetching users",
            error
        })
    }
}
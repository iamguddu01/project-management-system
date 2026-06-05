import db from "../models/index.js"
const { User, Project } = db; 

export const createProject = async (req, res)=>{
    try {
        let body  = req.body || {}
        const {title = "", createdBy = null} = body 
        if(!title || !createdBy){
            return res.status(400).json({
                message : "title and createdBy are required"
            })
        }

        const user = await User.findById(createdBy);
        if(!user){
            return res.status(400).json({
                message : "No such user exist"
            })
        }

        const allowedBody = {
            title : true,
            description : true,
            createdBy : true,
            teamMembers : true
        };

        let payloadForCreate = {};

        for(const key in body){
            if(allowedBody?.[key]){
                payloadForCreate[key] = body[key]
            }
        }

        const project = await Project.create({...payloadForCreate})
        return res.status(201).json({
            message : "project created successfully",
            project
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error while creating project",
            error
        })
    }
}

export const getAllProject = async(req, res) => {
    try {
        const projects = await Project.find({})
        return res.status(200).json({
            message : "projects fetched sussessfully",
            projects
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error while fetching project",
            error
        })
    }
}
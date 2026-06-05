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

export const updateProject = async (req, res)=>{
    const projectId = req.params?.id;
    let body = req.body || {};
    if(!projectId){
        return res.status(400).json({
            message : "Project Id is required"
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

    const project = await Project.findByIdAndUpdate(projectId, {
        ...payloadForCreate
    });
    if(!project){
        return res.status(400).json({
            message : "Project does not exist"
        })
    }

    return res.status(200).json({
        message : "project updated successfully",
        project
    })
}

export const deleteProject = async(req, res)=>{
    const projectId = req.params?.id;
    if(!projectId){
        return res.status(400).json({
            message : "Project Id is required"
        })
    }

    const project = await Project.findByIdAndDelete(projectId);
    if(!project){
        return res.status(400).json({
            message : "Project does not exist"
        })
    }

    return res.status(200).json({
        message : "project deleted successfully",
        project
    })
}
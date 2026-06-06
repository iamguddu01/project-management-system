import db from "../models/index.js"
const { User, Project, Task } = db; 

export const createTask = async (req, res)=>{
    try {
        let body  = req.body || {}
        const {title = "", createdBy = null, projectId=null} = body 
        if(!title || !createdBy || !projectId){
            return res.status(400).json({
                message : "title, project ID and createdBy are required"
            })
        }

        const user = await User.findById(createdBy);
        if(!user){
            return res.status(400).json({
                message : "No such user exist"
            })
        }

        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({
                message : "No such project found"
            })
        }

        const allowedBody = {
            title : true,
            description : true,
            createdBy : true,
            status : true,
            assignedTo : true,
            projectId : true
        };

        let payloadForCreate = {};

        for(const key in body){
            if(allowedBody?.[key]){
                payloadForCreate[key] = body[key]
            }
        }

        const task = await Task.create({...payloadForCreate})
        return res.status(201).json({
            message : "task created successfully",
            task
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error while creating project",
            error
        })
    }
}

export const getAllTask = async(req, res) => {
    try {
        const tasks = await Task.find({})
        return res.status(200).json({
            message : "tasks fetched sussessfully",
            tasks
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error while fetching tasks",
            error
        })
    }
}

export const updateTask = async (req, res)=>{
    const taskId = req.params?.id;
    let body = req.body || {};
    if(!taskId){
        return res.status(400).json({
            message : "task Id is required"
        })
    }

    const allowedBody = {
        title : true,
        description : true,
        createdBy : true,
        status : true,
        assignedTo : true,
        projectId : true
    };

    let payloadForCreate = {};

    for(const key in body){
        if(allowedBody?.[key]){
            payloadForCreate[key] = body[key]
        }
    }

    const task = await Task.findByIdAndUpdate(taskId, {
        ...payloadForCreate
    });
    if(!task){
        return res.status(400).json({
            message : "task does not exist"
        })
    }

    return res.status(200).json({
        message : "task updated successfully",
        task
    })
}

export const deleteTask = async(req, res)=>{
    const taskId = req.params?.id;
    if(!taskId){
        return res.status(400).json({
            message : "Task Id is required"
        })
    }

    const task = await Task.findByIdAndDelete(taskId);
    if(!task){
        return res.status(400).json({
            message : "Task does not exist"
        })
    }

    return res.status(200).json({
        message : "Task deleted successfully",
        task
    })
}
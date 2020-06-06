const Task = require('../Models/tasks')




exports.addtask = (req,res)=>{
    const task = new Task(req.body)
    task.save((err,task)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            task
        })
    })
}

exports.read = (req,res)=>{
    return res.json(req.task)

}


exports.taskByID = (req,res,next,id)=>{
    Task.findById(id).exec((err,task)=>{
        if(err){
            return res.status(400).json({
                error:"Task not found"
            })
        }
        req.task = task;
        next();
    })
}

exports.remove = (req,res)=>{
    let task = req.task;
    task.remove((err,deletedTask)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            message:"Task deleted successfully"
        })
    });
}

exports.update = (req,res)=>{
    Task.findOneAndUpdate({_id:req.task._id},{$set:req.body},{new:true},
        (err,task)=>{
            if(err){
                return res.status(400).json({
                    error:"Update failed"
                })
            }
            res.json({
                message:"Update successful"
            })

        }) 

}

exports.list = (req,res)=>{
   let orderBy = req.query.orderBy? req.query.orderBy : '_id';
   let sortBy = req.query.sortBy? req.query.sortBy: 1;
   let limit = req.query.limit?req.query.limit:6;

   Task.find()
        .sort([[sortBy,orderBy]])
        .limit(limit)
        .exec((err,task)=>{
            if(err){
                return res.status(400).json({
                    error:"Task not found"
                })
            }
            res.json(task);
        })
}


exports.listBySearch = (req,res)=>{
    const query = {};
    if(req.query.search){
        query.name = {$regex:req.query.search,$options:'i'};
        Task.find(query,(err,task)=>{
            if(err){
                return res.status(400).json({
                    error: "No task found"
                })
            }
            res.json({
                task
            });
        });
    }
}

exports.listByEmail = (req,res)=>{
    const query = {};
    console.log(req.profile.email)
        query.email = {$regex:req.profile.email,$options:'i'};
        Task.find(query,(err,task)=>{
            if(err){
                return res.status(400).json({
                    error: "No task found"
                })
            }
            res.json({
                task
            });
        });
}


exports.listByLabel = (req,res)=>{
    const query = {};
    console.log(req.profile.email)
        query.email = {$regex:req.profile.email,$options:'i'};
        query.label = {$regex:req.query.label,$options:'i'}
        Task.find(query,(err,task)=>{
            if(err){
                return res.status(400).json({
                    error: "No task found"
                })
            }
            res.json({
                task
            });
        });
}

exports.listBySearchEmail = (req,res)=>{
    const query = {};
    console.log(req.profile.email)
        query.email = {$regex:req.profile.email,$options:'i'};
        query.name = {$regex:req.query.search,$options:'i'}
        Task.find(query,(err,task)=>{
            if(err){
                return res.status(400).json({
                    error: "No task found"
                })
            }
            res.json({
                task
            });
        });
}
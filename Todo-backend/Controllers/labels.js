const Label = require('../Models/labels')



exports.addlabel = (req,res)=>{
    const label = new Label(req.body)
    label.save((err,label)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            label
        })
    })

}

exports.labelByID = (req,res,next,id)=>{
    Label.findById(id).exec((err,label)=>{
        if(err || !label){
            return res.status(400).json({
                error:"Label not found"
            })
        }
        req.label = label
        next();
    })
}

exports.read = (req,res)=>{
    return res.json(req.label);
}

exports.remove = (req,res)=>{
    let label = req.label;
    label.remove((err,deletedLabel)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            message:"delete successful"
        })
    })
    
}

exports.list = (req,res)=>{
    Label.find().exec((err,data)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            data
        })
    })
}

exports.listBySearch = (req,res)=>{
    const query = {};
    console.log(req.profile.email)
        query.email = {$regex:req.profile.email,$options:'i'};
        Label.find(query,(err,label)=>{
            if(err){
                return res.status(400).json({
                    error: "No label found"
                })
            }
            res.json({
                label
            });
        });
}
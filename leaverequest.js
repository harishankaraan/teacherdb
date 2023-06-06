import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const leaveRequestSchema= mongoose.Schema({
    leaveRequest:[{
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    status:{
        type:String,
    },
}]
})

const LeaveRequest=mongoose.model("LeaveRequest",leaveRequestSchema);
leaveRequestSchema.plugin(LeaveRequest)
const user={
    leaveRequest:[
    {
        // name:"Hari",
        // rollNum:"0001",
        from:"02/03/2023",
        to:"07/03/2023",
        status:"Approved",
    },
    {
        // name:"Aswini",
        // rollNum:"0002",
        from:"02/03/2023",
        to:"07/03/2023",
        status:"Approved",
    },
]
}

// const app=express();
// app.use(express.json());

// get

router.get('/',(req,res)=>{
    try{
        res.status(200).send(user);
    }
    catch(error){
        res.json({message:"unable to create"});
    }
});

// specificData

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    LeaveRequest.findById(req.params.id)

    .then(result=>{
        res.status(200).json({
            user:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(505).json({
            error:err
        })
    })
})

// post

router.post('/', async(req,res)=>{
    try{
        const details={
            leaveRequest:req.body.leaveRequest,
        }
        console.log(details);
        const user=new LeaveRequest(details);
        const userCreated=await user.save();
        if(userCreated){
            console.log("created");
            res.status(201).json({message:"successfully created"});
        }
        else{
            res.status(401);
            throw new error("not found");
        }
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
});

// put

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    LeaveRequest.findOneAndUpdate({_id:req.params.id},{
        $set:{
            leaveRequest:req.body.leaveRequest,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_leaveRequest:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    LeaveRequest.findByIdAndRemove({_id:req.params.id},{
        $set:{
            leaveRequest:req.body.leaveRequest,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_leaveRequest:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
        
    })
})
router.delete('/',(req,res)=>{
    
    LeaveRequest.deleteMany({user},(err,result)=>{
    if(err) throw err
    res.send(user)
    })
})


export default router;
// const port=9532;
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`);
// });
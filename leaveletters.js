import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const leaveLetterSchema= mongoose.Schema({
    leaveLetter:[{
    name:{
        type:String,
        required:true,
    },
    standard:{
        type:String,
        required:true,
    },
    section:{
        type:String,
    },
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    reason:{
        type:String,
    },
}]
})

const LeaveLetter=mongoose.model("LeaveLetter",leaveLetterSchema);
leaveLetterSchema.plugin(LeaveLetter)
const user={
    leaveLetter:[
    {
        name:"Harish",
        standard:"10th",
        section:"A",
        from:"02/03/2023",
        to:"07/03/2023",
        reason:"I am suffering from common cold, so please kindly give me leave ",
    },
    {
        name:"Shalini",
        standard:"10th",
        section:"A",
        from:"02/03/2023",
        to:"07/03/2023",
        reason:"I am suffering from common cold, so please kindly give me leave ",
    },
    {
        name:"Devipriya",
        standard:"10th",
        section:"A",
        from:"02/03/2023",
        to:"07/03/2023",
        reason:"I am suffering from common cold, so please kindly give me leave ",
    },
    {
        name:"Aswini",
        standard:"10th",
        section:"A",
        from:"02/03/2023",
        to:"07/03/2023",
        reason:"I am suffering from common cold, so please kindly give me leave ",
    },
    {
        name:"Hari",
        standard:"10th",
        section:"A",
        from:"02/03/2023",
        to:"07/03/2023",
        reason:"I am suffering from common cold, so please kindly give me leave ",
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
    LeaveLetter.findById(req.params.id)

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
            leaveLetter:req.body.leaveLetter,
           
        }
        console.log(details);
        const user=new LeaveLetter(details);
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
    LeaveLetter.findOneAndUpdate({_id:req.params.id},{
        $set:{
            leaveLetter:req.body.leaveLetter,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_leaveLetter:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

// delete

router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    LeaveLetter.findByIdAndRemove({_id:req.params.id},{
        $set:{
            leaveLetter:req.body.leaveLetter,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_leaveLetter:result
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
    
    LeaveLetter.deleteMany({user},(err,result)=>{
    if(err) throw err
    res.send(user)
    })
})

export default router;

// const port=9532;
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`);
// });
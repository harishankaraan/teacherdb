import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const eventSchema= mongoose.Schema({
    event:[{
    eventDate:{
        type:String,
        required:true,
    },
    eventDay:{
        type:String,
        required:true,
    },
    event:{
        type:String,
    },
}]
})

const Event=mongoose.model("Event",eventSchema);
eventSchema.plugin(Event)
const user={
    event:[
    {
        eventDate:"08/03/2023",
        eventDay:"wednesday",
        event:"Holi",
    },
    {
        eventDate:"07/04/2023",
        eventDay:"Friday",
        event:"Good Friday",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
    },
    {
        eventDate:"01/05/2023",
        eventDay:"Monday",
        event:"May Day",
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
    Event.findById(req.params.id)

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
            event:req.body.event,
        }
        console.log(details);
        const user=new Event(details);
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
    Event.findOneAndUpdate({_id:req.params.id},{
        $set:{
            event:req.body.event,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_event:result
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
    Event.findByIdAndRemove({_id:req.params.id},{
        $set:{
            event:req.body.event,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_event:result
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
    
    Event.deleteMany({user},(err,result)=>{
    if(err) throw err
    res.send(user)
    })
})


export default router;

// const port=9532;
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`);
// });
import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const timeTableSchema= mongoose.Schema({
    timeTable:[{
   monday:{
    subject:{
        type:String,
    },
    teachers:{
        type:String,
    },
    schedule:{
        type:String,
    },
   },
   tuesday:{
    subject:{
        type:String,
    },
    teachers:{
        type:String,
    },
    schedule:{
        type:String,
    },
   },

   wednesday:{
    subject:{
        type:String,
    },
    teachers:{
        type:String,
    },
    schedule:{
        type:String,
    },
   },

   thursday:{
    subject:{
        type:String,
    },
    teachers:{
        type:String,
    },
    schedule:{
        type:String,
    },
   },

   friday:{
    subject:{
        type:String,
    },
    teachers:{
        type:String,
    },
    schedule:{
        type:String,
    },
   },

   saturday:{
    subject:{
        type:String,
    },
    teachers:{
        type:String,
    },
    schedule:{
        type:String,
    },
   },
}]
})

const TimeTable=mongoose.model("TimeTable",timeTableSchema);
timeTableSchema.plugin(TimeTable)
const user={
    timeTable:[
    {
       monday:{
        subject:"English",
        teachers:"Harish",
        schedule:"10:45 AM - 11:30 AM",
       },

    },
    {
        tuesday:{
            subject:"English",
            teachers:"Harish",
            schedule:"11:30 AM - 12:30 PM",
           }
    },
    {
        wednesday:{
            subject:"English",
            teachers:"Harish",
            schedule:"01:30 PM - 02:30 PM",
           }
    },
    {
        thursday:{
            subject:"English",
            teachers:"Harish",
            schedule:"01:30 PM - 02:30 PM",
           }
    },
    {
        friday:{
            subject:"English",
            teachers:"Harish",
            schedule:"01:30 PM - 02:30 PM",
           }
    },
    {
        saturday:{
            subject:"English",
            teachers:"Harish",
            schedule:"01:30 PM - 02:30 PM",
           }
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
    TimeTable.findById(req.params.id)

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
           timeTable:req.body.timeTable,
        }
        console.log(details);
        const user=new TimeTable(details);
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
    TimeTable.findOneAndUpdate({_id:req.params.id},{
        $set:{
            timeTable:req.body.timeTable,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_timeTable:result
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
    TimeTable.findByIdAndRemove({_id:req.params.id},{
        $set:{
            timeTable:req.body.timeTable,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_timeTable:result
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
    
    TimeTable.deleteMany({user},(err,result)=>{
    if(err) throw err
    res.send(user)
    })
})


export default router;
// const port=9532;
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`);
// });
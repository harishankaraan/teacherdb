import express from "express";
import mongoose from "mongoose";
import multer from "multer";
const router=express.Router();

const scheduleSchema= mongoose.Schema({

    date:{
        type:String,
        // required:true,
    },
    day:{
        type:String,
        // required:true,
    },
    schedule:{
        type:String,
    },
    time:{
        type:String,
    },

})

const Schedule=mongoose.model("Schedule",scheduleSchema);
scheduleSchema.plugin(Schedule)

const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')


const user={
    schedule:[
    {
        date:"06/06/2023",
        day:"Tuesday",
        schedule:"English",
        time:"10:00AM-11:00AM"
    },
    {
        date:"07/06/2023",
        day:"Wednesday",
        schedule:"English",
        time:"10:00AM-11:00AM"
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
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Schedule.findByID({_id:req.params.id},{
                date:req.body.date,
                day:req.body.day,
                schedule:req.body.schedule,
                time:req.body.time,
            })
                .then(result=>{
                    res.status(200).json({
                        files:result
                    })
                })
                .catch(err=>{
                    console.log(err);
                    res.status(505).json({
                        error:err
                    })
                }
    )}
    })
})

// post

router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newFile = new   Schedule({
                date:req.body.date,
                day:req.body.day,
                schedule:req.body.schedule,
                time:req.body.time,
            })
            newFile.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

//upload post


router.put('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Schedule.findOneAndUpdate({_id:req.params.id},{
                date:req.body.date,
                day:req.body.day,
                schedule:req.body.schedule,
                time:req.body.time,
            })
          
            .then(result=>{
                res.status(200).json({
                    updated_user:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
        
        }
    })
    
})

// delete

router.delete('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Schedule.deleteOne({_id:req.params.id},{
                date:req.body.date,
                day:req.body.day,
                schedule:req.body.schedule,
                time:req.body.time,
            })
          
            .then(result=>{
                res.status(200).json({
                   deleted_user:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
        
        }
    })

    
})

//deleteAll

router.delete('/',async(req,res)=>{
    Schedule.deleteMany({}).then((result) => {
             res.send(result);
         })
     });


export default router;

import express from "express";
import mongoose from "mongoose";
import multer from "multer";
const router=express.Router();

const addeventSchema= mongoose.Schema({

    eventName:{
        type:String,
        // required:true,
    },
    selectEvent:{
        type:String,
        // required:true,
    },
    date:{
        type:String,
    },

})

const Addevent=mongoose.model("Addevent",addeventSchema);
addeventSchema.plugin(Addevent)

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
    addevent:[
    {
        eventName:"Independence Day",
        selectEvent:"School Event",
        date:"15/08/2023",
    },
    {
        eventName:"Republic Day",
        selectEvent:"School Event",
        date:"26/01/2024",
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
            Addevent.findByID({_id:req.params.id},{
                eventName:req.body.eventName,
                selectEvent:req.body.selectEvent,
                date:req.body.date,
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
            const newFile = new   Addevent({
                eventName:req.body.eventName,
                selectEvent:req.body.selectEvent,
                date:req.body.date,
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
            Addevent.findOneAndUpdate({_id:req.params.id},{
                eventName:req.body.eventName,
                selectEvent:req.body.selectEvent,
                date:req.body.date,
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
            Addevent.deleteOne({_id:req.params.id},{
                eventName:req.body.eventName,
                selectEvent:req.body.selectEvent,
                date:req.body.date,
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
    Addevent.deleteMany({}).then((result) => {
             res.send(result);
         })
     });


export default router;

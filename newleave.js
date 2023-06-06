import express from "express";
import mongoose from "mongoose";
import multer from "multer";
const router=express.Router();

const newleaveSchema= mongoose.Schema({

    leaveType:{
        type:String,
        // required:true,
    },
    reason:{
        type:String,
        // required:true,
    },
    date:{
        type:String,
    },

})

const Newleave=mongoose.model("Newleave",newleaveSchema);
newleaveSchema.plugin(Newleave)

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
    newleave:[
    {
        leaveType:"Medical Leave",
        reason:"Suffering from common cold",
        date:"06/06/2023",
    },
    {
        leaveType:"Medical Leave",
        reason:"Suffering from common cold",
        date:"07/06/2023",
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
            Newleave.findByID({_id:req.params.id},{
                leaveType:req.body.leaveType,
                reason:req.body.reason,
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
            const newFile = new   Newleave({
                leaveType:req.body.leaveType,
                reason:req.body.reason,
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
            Newleave.findOneAndUpdate({_id:req.params.id},{
                leaveType:req.body.leaveType,
                reason:req.body.reason,
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
            Newleave.deleteOne({_id:req.params.id},{
                leaveType:req.body.leaveType,
                reason:req.body.reason,
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
    Newleave.deleteMany({}).then((result) => {
             res.send(result);
         })
     });


export default router;

import express from "express";
import mongoose from "mongoose";
import multer from "multer";
const router=express.Router();

const uploadassignmentSchema= mongoose.Schema({

    standard:{
        type:String,
        // required:true,
    },
    subject:{
        type:String,
        // required:true,
    },
    assignment:{
        type:String,
    },
    assignmentDate:{
        type:String,
    },
    submissionDate:{
        type:String,
    },
    file:{
        data:String,
     contentType: String
    }

})

const Uploadassignment=mongoose.model("Uploadassignment",uploadassignmentSchema);
uploadassignmentSchema.plugin(Uploadassignment)

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
    uploadassignment:[
    {
        standard:"10th",
        subject:"English",
        assignment:"FA 1",
        assignmentDate:"02/03/2023",
        submissionDate:"07/03/2023",
        file:{
            data:"https://img.freepik.com/free-photo/front-view-young-beautiful-lady-red-t-shirt-black-jeans-holding-different-copybooks-files-smiling-with-bag-white_140725-18639.jpg?size=626&ext=jpg&ga=GA1.2.1712142773.1672033835&semt=ais",
           contentType:"file/pdf"
        }
    },
    {
        standard:"10th",
        subject:"Computer",
        assignment:"FA 1",
        assignmentDate:"02/03/2023",
        submissionDate:"07/03/2023",
        file:{
            data:"https://drive.google.com/file/d/1PPlIx2W7nygSfaJRnQHh2lEEBmmQzJrp",
           contentType:"file/pdf"
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
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Uploadassignment.findByID({_id:req.params.id},{
                standard:req.body.standard,
                subject:req.body.subject,
                assignment:req.body.assignment,
                assignmentDate:req.body.assignmentDate,
                submissionDate:req.body.submissionDate,
                file:{
                    data:req.file.filename,
                    contentType:'pdf'
                }
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
            const newFile = new   Uploadassignment({
                standard:req.body.standard,
                subject:req.body.subject,
                assignment:req.body.assignment,
                assignmentDate:req.body.assignmentDate,
                submissionDate:req.body.submissionDate,
                file:{
                    data:req.file.filename,
                    contentType:'pdf'
                }
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
            Uploadassignment.findOneAndUpdate({_id:req.params.id},{
                standard:req.body.standard,
                subject:req.body.subject,
                assignment:req.body.assignment,
                assignmentDate:req.body.assignmentDate,
                submissionDate:req.body.submissionDate,
                file:{
                    data:req.file.filename,
                    contentType:'pdf'
                }
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
            Uploadassignment.deleteOne({_id:req.params.id},{
                standard:req.body.standard,
                subject:req.body.subject,
                assignment:req.body.assignment,
                assignmentDate:req.body.assignmentDate,
                submissionDate:req.body.submissionDate,
                file:{
                    data:req.file.filename,
                    contentType:'pdf'
                }
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
    Uploadassignment.deleteMany({}).then((result) => {
             res.send(result);
         })
     });


export default router;

import express from "express";
import mongoose from "mongoose";
import multer from "multer";
const router=express.Router();

const reportcardSchema= mongoose.Schema({

    exam:{
        type:String,
        // required:true,
    },
    resultDate:{
        type:String,
        // required:true,
    },
    studentName:{
        type:String,
    },
    enrollNo:{
        type:String,
    },
    subject:{
        type:String,
    },
    totalMarks:{
        type:String,
    },
    passingMarks:{
        type:String,
    },
    obtainedMark:{
        type:String,
    },

})

const Reportcard=mongoose.model("Reportcard",reportcardSchema);
reportcardSchema.plugin(Reportcard)

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
    reportcard:[
    {
        exam:"Mid Term Examination",
        resultDate:"06/06/2023",
        studentName:"Harish",
        enrollNo:"0001",
        subject:"English",
        totalMarks:"500",
        passingMarks:"175",
        obtainedMark:"412",
    },
    {
        exam:"Mid Term Examination",
        resultDate:"06/06/2023",
        studentName:"Shalini",
        enrollNo:"0002",
        subject:"English",
        totalMarks:"500",
        passingMarks:"175",
        obtainedMark:"481",
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
            Reportcard.findByID({_id:req.params.id},{
                exam:req.body.exam,
                resultDate:req.body.resultDate,
                studentName:req.body.studentName,
                enrollNo:req.body.enrollNo,
                subject:req.body.subject,
                totalMarks:req.body.totalMarks,
                passingMarks:req.body.passingMarks,
                obtainedMark:req.body.obtainedMark
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
            const newFile = new   Reportcard({
                exam:req.body.exam,
                resultDate:req.body.resultDate,
                studentName:req.body.studentName,
                enrollNo:req.body.enrollNo,
                subject:req.body.subject,
                totalMarks:req.body.totalMarks,
                passingMarks:req.body.passingMarks,
                obtainedMark:req.body.obtainedMark
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
            Reportcard.findOneAndUpdate({_id:req.params.id},{
                exam:req.body.exam,
                resultDate:req.body.resultDate,
                studentName:req.body.studentName,
                enrollNo:req.body.enrollNo,
                subject:req.body.subject,
                totalMarks:req.body.totalMarks,
                passingMarks:req.body.passingMarks,
                obtainedMark:req.body.obtainedMark
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
            Reportcard.deleteOne({_id:req.params.id},{
                exam:req.body.exam,
                resultDate:req.body.resultDate,
                studentName:req.body.studentName,
                enrollNo:req.body.enrollNo,
                subject:req.body.subject,
                totalMarks:req.body.totalMarks,
                passingMarks:req.body.passingMarks,
                obtainedMark:req.body.obtainedMark
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
    Reportcard.deleteMany({}).then((result) => {
             res.send(result);
         })
     });


export default router;

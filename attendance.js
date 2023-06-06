import express from "express";
import mongoose from "mongoose";
import multer from "multer";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const attendancesSchema= mongoose.Schema({
    attendances:[{
    
   name:{
    type:String,
   },

   rollNo:{
    type:String,
   },

   standard:{
    type:String,
   },

   section:{
    type:String,
   },

   date:{
    type:String,
   },

   attendance:{
    type:String,
   },

   total:{
    type:String,
   },

   image:{
    data:String,
    contentType:String
}, 
}]
    },
 )
 

const Attendances=mongoose.model("Attendances",attendancesSchema);
attendancesSchema.plugin(Attendances)

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
    attendances:[{
       
        name:"Harish",
        rollNo:"0001",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
    },
    {
        
        name:"Shalini",
        rollNo:"0002",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
    },
    {
       
        
        name:"Hem",
        rollNo:"0003",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Absent",
        total:"30",
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
    },
    {
        
        name:"Devi",
        rollNo:"0004",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
    },
    {
        name:"Hari",
        rollNo:"0005",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
    },
    {
        name:"Megha",
        rollNo:"0006",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Absent",
        total:"30",
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
    },
    {
        name:"Aswini",
        rollNo:"0007",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
    },
    {
        name:"Gowri",
        rollNo:"0008",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
    },
   
]}

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
            Attendances.findByID({_id:req.params.id},{
                standard:req.body.standard,
                name:req.body.name,
                rollNo:req.body.rollNo,
                standard:req.body.standard,
                section:req.body.section,
                date:req.body.date,
                attendance:req.body.attendance,
                total:req.body.total,
                image:{
                    data:req.file.filename,
                    contentType:'image'
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
            const newFile = new   Attendances({
                standard:req.body.standard,
                name:req.body.name,
                rollNo:req.body.rollNo,
                standard:req.body.standard,
                section:req.body.section,
                date:req.body.date,
                attendance:req.body.attendance,
                total:req.body.total,
                image:{
                    data:req.file.filename,
                    contentType:'image'
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
            Attendances.findOneAndUpdate({_id:req.params.id},{
                standard:req.body.standard,
                name:req.body.name,
                rollNo:req.body.rollNo,
                standard:req.body.standard,
                section:req.body.section,
                date:req.body.date,
                attendance:req.body.attendance,
                total:req.body.total,
                image:{
                    data:req.file.filename,
                    contentType:'image'
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

//delete

router.delete('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Attendances.deleteOne({_id:req.params.id},{
                standard:req.body.standard,
                name:req.body.name,
                rollNo:req.body.rollNo,
                standard:req.body.standard,
                section:req.body.section,
                date:req.body.date,
                attendance:req.body.attendance,
                total:req.body.total,
                image:{
                    data:req.file.filename,
                    contentType:'image'
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


//Delete many


router.delete('/',async(req,res)=>{
    Attendances.deleteMany({}).then((result) => {
             res.send(result);
         })
     });


export default router;
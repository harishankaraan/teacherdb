import express from "express";
import mongoose from "mongoose";
import multer from "multer";
const router=express.Router();

const assignmentSchema= mongoose.Schema({

    enrollNo:{
        type:String,
        // required:true,
    },
    name:{ 
        type:String,
        // required:true,
    },
    image:{
        data:String,
     contentType: String
    }

})

const Assignment=mongoose.model("Assignment",assignmentSchema);
assignmentSchema.plugin(Assignment)

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
    assignment:[
    {
        enrollNo:"0001",
        name:"Harish",
        image:{
            data:"https://img.freepik.com/free-photo/front-view-young-beautiful-lady-red-t-shirt-black-jeans-holding-different-copybooks-files-smiling-with-bag-white_140725-18639.jpg?size=626&ext=jpg&ga=GA1.2.1712142773.1672033835&semt=ais",
           contentType:"image/png"
        }
    },
    {
        enrollNo:"0002",
        name:"Shalini",
        image:{
            data:"https://img.freepik.com/free-photo/front-view-young-beautiful-lady-red-t-shirt-black-jeans-holding-different-copybooks-files-smiling-with-bag-white_140725-18639.jpg?size=626&ext=jpg&ga=GA1.2.1712142773.1672033835&semt=ais",
           contentType:"image/png"
        }
    },
    {
        enrollNo:"0003",
        name:"Devipriya",
        image:{
            data:"https://img.freepik.com/free-photo/front-view-young-beautiful-lady-red-t-shirt-black-jeans-holding-different-copybooks-files-smiling-with-bag-white_140725-18639.jpg?size=626&ext=jpg&ga=GA1.2.1712142773.1672033835&semt=ais",
           contentType:"image/png"
        }
    },
    {
        enrollNo:"0004",
        name:"Hem",
        image:{
            data:"https://img.freepik.com/free-photo/front-view-young-beautiful-lady-red-t-shirt-black-jeans-holding-different-copybooks-files-smiling-with-bag-white_140725-18639.jpg?size=626&ext=jpg&ga=GA1.2.1712142773.1672033835&semt=ais",
           contentType:"image/png"
        }
    },
    {
        enrollNo:"0005",
        name:"Hari",
        image:{
            data:"https://img.freepik.com/free-photo/front-view-young-beautiful-lady-red-t-shirt-black-jeans-holding-different-copybooks-files-smiling-with-bag-white_140725-18639.jpg?size=626&ext=jpg&ga=GA1.2.1712142773.1672033835&semt=ais",
           contentType:"image/png"
        }
    },
    {
        enrollNo:"0006",
        name:"Megha",
        image:{
            data:"https://img.freepik.com/free-photo/front-view-young-beautiful-lady-red-t-shirt-black-jeans-holding-different-copybooks-files-smiling-with-bag-white_140725-18639.jpg?size=626&ext=jpg&ga=GA1.2.1712142773.1672033835&semt=ais",
           contentType:"image/png"
        }
    },
    {
        enrollNo:"0007",
        name:"Aswini",
        image:{
            data:"https://img.freepik.com/free-photo/front-view-young-beautiful-lady-red-t-shirt-black-jeans-holding-different-copybooks-files-smiling-with-bag-white_140725-18639.jpg?size=626&ext=jpg&ga=GA1.2.1712142773.1672033835&semt=ais",
           contentType:"image/png"
        }
    },
    {
        enrollNo:"0008",
        name:"Naveen",
        image:{
            data:"https://img.freepik.com/free-photo/front-view-young-beautiful-lady-red-t-shirt-black-jeans-holding-different-copybooks-files-smiling-with-bag-white_140725-18639.jpg?size=626&ext=jpg&ga=GA1.2.1712142773.1672033835&semt=ais",
           contentType:"image/png"
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
            Assignment.findByID({_id:req.params.id},{
                enrollNo:req.body.enrollNo,
                name:req.body.name,
                
                image:{
                    data:req.image.imagename,
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
            const newFile = new   Assignment({
                enrollNo:req.body.enrollNo,
                name:req.body.name,
                
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
            Assignment.findOneAndUpdate({_id:req.params.id},{
                enrollNo:req.body.enrollNo,
                name:req.body.name,
                
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

// delete

router.delete('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Assignment.deleteOne({_id:req.params.id},{
                enrollNo:req.body.enrollNo,
                name:req.body.name,
                
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

//deleteAll

router.delete('/',async(req,res)=>{
    Assignment.deleteMany({}).then((result) => {
             res.send(result);
         })
     });


export default router;

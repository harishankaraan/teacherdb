import express from 'express';
import mongoose from 'mongoose';
import multer from "multer";
import path from "path";

const router=express.Router();


const gallerySchema= mongoose.Schema({

    gallery:[{
        name:{
            type:String
        },

        image:{
            data:String,
            contentType:String
        },
    }]
})

const Gallery=mongoose.model("Gallery",gallerySchema);
gallerySchema.plugin(Gallery)

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
    gallery:[
        {
            name:"By Devipriya",
            image:{
                
        data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
        contentType:"image/png"
            }
        },
        {
         name:"By Aswini",
                image:{
                    
            data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
            contentType:"image/png"
                
            }  
        },
        {
            name:"By rathiga",
            image:{
                
        data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
        contentType:"image/png"
            }
        },  
        {
            name:"By megha",
            image:{
                
        data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
        contentType:"image/png"
            }
        }
    ]}

//get

router.get('/',(req,res)=>{
    try{
        res.status(200).send(user);
    }
    catch(error){
        res.json({message:"unable to create"});
    }
});


//specificData

router.get('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Gallery.findById({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
          
            .then(result=>{
                res.status(200).json({
                   user:result
                })
            })
            .catch(err=> {
            console.log(err);
            res.status(505).json({
                error:err
            })
            }
          )
        }
    })
    
})


//Post

router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newUser = new Gallery({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newUser.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

//Put

router.put('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Gallery.findOneAndUpdate({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
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

//Delete

router.delete('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Gallery.deleteOne({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
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

//delete many

router.delete('/',async(req,res)=>{
    Gallery.deleteMany({}).then((result) => {
             res.send(result);
         })
     });
export default router;
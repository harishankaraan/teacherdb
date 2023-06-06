import express from "express";
import mongoose from "mongoose";
import multer from "multer";
const router =express.Router();
// connectDB();
const librarySchema=mongoose.Schema(
    {
        collections:[{

            image:{
                data:String,
                contentType:String
            },

            bookname:{
                type:String,
            },

            category:{
                type:String,
            },

            authorname:{
                type:String,
            },
        }]
    }
)

const Library=mongoose.model("Library",librarySchema);
librarySchema.plugin(Library)


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')

const library={
collections:[
    {
    image:{
    data:"https://png.pngtree.com/element_our/20190602/ourmid/pngtree-blue-book-decoration-illustration-image_1386843.jpg" , 
    contentType:"image/png" 
    },
    bookname:"Bluebook",
    category:"Grammer",
    authorname:"steephan"
},
{
    image:{
        data:"https://w7.pngwing.com/pngs/586/262/png-transparent-science-book-science-book-scientific-journal-third-grade-science-text-reading-essay-thumbnail.png",
        contentType:"image/png"
    },
    bookname:"planatation",
    category:"science",
    authorname:"josh evans"
},
{
    image:{
        data:"https://w7.pngwing.com/pngs/781/750/png-transparent-reading-magic-book-scholastic-corporation-story-s-blue-child-text-thumbnail.png",
        contentType:"image/png"
    },
    bookname:"the key of success",
    category:"story",
    authorname:"jerry clifford"
},
{
    image:{
        data:"https://w7.pngwing.com/pngs/506/256/png-transparent-history-history-angle-text-rectangle-thumbnail.png",
        contentType:"image/png"
    },
    bookname:"Discovery of India",
    category:"history",
    authorname:"Jawaharlal Nehru"
},
{
    image:{
        data:"https://png.pngtree.com/element_our/20190523/ourmid/pngtree-cute-cartoon-book-png-material-image_1091904.jpg",
        contentType:"image/png"
    },
    bookname:"The magic mango",
    category:"picture book",
    authorname:"josh evans"
},
{
    image:{
        data:"https://png.pngtree.com/png-vector/20191022/ourmid/pngtree-dictionary-of-english-language-icon-cartoon-style-png-image_1837699.jpg",
        contentType:"image/png"
    },
    bookname:"Word power made easy",
    category:"vocabulary",
    authorname:"Norman lewis"
},
{
    image:{
        data:"https://w7.pngwing.com/pngs/814/965/png-transparent-steve-jobs-book-biography-reading-resume-steve-jobs-celebrities-text-resume-thumbnail.png",
        contentType:"image/png"
    },
    bookname:"Believe in Yourself",
    category:"biography",
    authorname:"josheph murphy"
},
{
    image:{
        data:"https://png.pngtree.com/png-clipart/20210310/ourmid/pngtree-math-clipart-cartoon-math-book-png-image_2997364.jpg",
        contentType:"image/png",
    },
    bookname:"polynomials",
    category:"mathematics",
    authorname:"Victory V.Prasolov"
}
]
}

// app.set("view engine","ejs");

// app.use(express.static("public"));
router.get('/data',(req,res)=>{
res.render("data");
})
router.get('/download-file',(req,res)=>{
    res.download("./book/Nodejs contents 1.pdf");
})


//get
router.get('/',(req,res) =>
{
    try{
        res.status(200).send(library);
    }
    catch(error){
        res.json({message:"not available"});
    }
});


//specificData
router.get('/:id',(req,res)=>{
    console.log(req.params.id);
  Library.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            library:result
        })
    })
    .catch(err=> {
    console.log(err);
    res.status(505).json({
        error:err
    })
    }
  )
})

//post
router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new Library({
               collections:req.body.collections
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

//put
router.post('/download-file',(req,res)=>{
    res.download("./book/Nodejs contents 1.pdf");
})
router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Library.findOneAndUpdate({_id:req.params.id},{
        $set:{
            collections:req.body.collections
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_library:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })

    //delete
    router.delete('/:id',(req,res)=>{
        console.log(req.params.id);
        Library.deleteOne({_id:req.params.id},{
            $set:{
                collections:req.body.collections
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_library:result       
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
    
            Library.deleteMany({library},(err,result)=>{
            if(err) throw err
            res.send(library)
            })
        })

        export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(library);
// });

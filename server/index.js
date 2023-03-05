const express =require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();

const foodModel=require("./models/Food")
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://flashner:flashnerxyz@cluster0.iiianrk.mongodb.net/fcc?retryWrites=true&w=majority",{
    useNewUrlParser:true,
});


app.post("/insert",async(req,res) =>{
    const fName=req.body.fName;
    const days=req.body.days;
    const food=new foodModel({fName: fName,days: days});
    try{
        await food.save()
        res.send("inseted!!")
    }
    catch(err){
        console.log(err);
    }
});

app.get("/read",async(req,res) =>{
foodModel.find({}).then(result=>{
    res.send(result);
}).catch(err=>{
    res.send(err);
})
});

app.put("/update",async(req,res) =>{
    const newfName=req.body.newfName;
    const id=req.body.id;
    
   
      await foodModel.findById(id).then(updatedfood=>{
        updatedfood.fName=newfName;
        updatedfood.save();
        res.send("updated!!");
      }).catch(err=>{
        console.log(err);
      })
});


app.delete("/delete/:id",async (req,res)=>{
  const id=req.params.id;
  await foodModel.findByIdAndRemove(id).exec();
  res.send("deleted!!");
})

app.listen(8080,()=>{
    console.log("server running on port 8080.");
});
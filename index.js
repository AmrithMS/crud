const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const PhoneModel = require('./Model/Phone');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/crud",{
    useNewUrlParser: true
})

mongoose.connection
    .once("open",()=>{console.log("connected to mongoose")})
    .on("error",(error)=>{console.log(error)});

app.post("/insert",async (req,res)=>{

    const personName = req.body.personName;
    const phoneNumber = req.body.phoneNumber;
    const phone = new PhoneModel({PhoneNumber: phoneNumber, Name: personName})

    try{
        await phone.save();
        res.send("data inserted")
    }
    catch(err){
        console.log(err);
    };
});


app.get("/read", async (req,res)=>{
    PhoneModel.find({}, (error,result) => {
        if(error){
            res.send(error)
        }
        res.send(result)
    })
});

app.put("/update",async (req,res)=>{

    const NewPersonName = req.body.NewPersonName;
    const id = req.body.id;
    
    try{
        await PhoneModel.findById(id,(err,updatedName)=>{
            updatedName.personName = NewPersonName;
            updatedName.save();
            res.send("updated");
        })
    }
    catch(err){
        console.log(err);
    };
});

app.delete("/delete/:id", async (req,res)=>{
    const id = req.params.id;

    PhoneModel.findByIdAndRemove(id).exec();
    res.send("deleted");
})

app.listen(8000,()=>{
    console.log(`server running at port 8000`);
});
const express = require('express');
const mongoose = require('mongoose');
const Etudiant = require('./models/etudiant');
const body_Parser = require('body-parser');

  
const app = express();


app.use(body_Parser.urlencoded({ extended: false }));

app.use(body_Parser.json());



app.get('/etudiants', async (req,res)=>{
    
    try {
        await Etudiant.find({})
        .then( result => {
            res.send(result)
        })        
    }catch(err){
        console.log(err);
    }
    
});


app.delete('/delete/:id', async (req,res)=> {
    try {
        await Etudiant.findOneAndDelete({id:req.params.id});
        res.send("delete effecctué")
    }catch (err){
        console.log(err);
    }
});

app.put('/miseajour/:id', async (req,res)=> {
    try {
        await Etudiant.findOneAndUpdate({id:req.params.id},{email : req.body.email});
        res.send("mise a jour effecctué")
    }catch (err){
        console.log(err);
    }
});

app.post('/ajouter_etudiant', async (req,res)=>{
  try {
    let new_etudiant = new Etudiant({
        cin : req.body.cin,
        nom : req.body.nom,
        prenom : req.body.prenom,
        email : req.body.email
    });
    await new_etudiant.save();
    res.send("save effecctué")
  } catch (err) {
    console.log(err);
  }
});


mongoose.connect("mongodb+srv://makrem:makrem@cluster0.djgtv.mongodb.net/?retryWrites=true&w=majority",(err,done)=>{
    if (err){
        console.log(err);
    }
    if (done){
        console.log("base de donnee connecte avec succes !");
    }

});


app.listen(5000,()=>{
    console.log("Server en marche")
})


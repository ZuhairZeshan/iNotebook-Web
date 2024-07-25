const express=require('express');
const router=express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body,validationResult } = require('express-validator');


//ROUTE-1 : To get all the notes of the respective user.
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes= await Note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE-2 : To add notes of the respective user.
router.post('/addnote',fetchuser, [
    body("title","Enter a Valid Title Name").isLength({min:3}),
    body("description","Description must atleast have 5 characters").isLength({min:5})
] , async (req,res)=>{

    try {
        const {title,description,tag}=req.body;

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const note=new Note({
            title,description,tag,user:req.user.id
        })
        const savednote=await note.save();
        res.json(savednote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})


//ROUTE-3 : update an existing note.
router.put('/updatenote/:id', fetchuser , async (req,res)=>{

    try {
        const {title,description,tag}=req.body;
        
        const newnote={};//new note object
        if(title){newnote.title  = title};
        if(description){newnote.description  = description};
        if(tag){newnote.tag  = tag};
            
        let note= await Note.findById(req.params.id);//find the note that has to be updated.
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){//Authenticating the user is valid or not
            return res.status(401).send("Not Allowed");
        }
        
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        res.json({note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})    

//ROUTE-4 : delete note
router.delete('/deletenote/:id', fetchuser , async (req,res)=>{
    try {
        const {title,description,tag}=req.body;
        
        let note= await Note.findById(req.params.id);//find the note that has to be deleted.
        if(!note){return res.status(404).send("Not Found")}
    
        if(note.user.toString() !== req.user.id){//Authenticating the user is valid or not
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Note has been Deleted" , note : note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})   



module.exports=router
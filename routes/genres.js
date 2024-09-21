const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name : {type: 'string',
    required : true ,
    minlength : 5 ,
    maxlength : 50}
}));
router.get('/',async(req,res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
});
router.get('/:id',async(req,res)=>{
   const genre = await Genre.findById(req.params.id);
    if(!genre){
        res.status(400).send('Genre was not found!');
        return;
    };
    res.send(genre);
});
router.post('/',async(req,res)=>{
    const schema =Joi.object({
        name : Joi.string().required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send('is not valid');
        return;
    };
    let genre = new Genre({name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});
router.put('/:id',async(req,res)=>{
    const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new : true});
    const schema =Joi.object({
        name : Joi.string().required()
     });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send('is not valid');
        return;
    };
    if(!genre){
        res.status(400).send('Genre was not found!');
        return;
    };
    res.send(genre);
});
router.delete('/:id',async(req,res)=>{
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if(!genre){
        res.status(400).send('Genre was not found!');
        return;
    };
    res.send(genre);
});
module.exports= router;
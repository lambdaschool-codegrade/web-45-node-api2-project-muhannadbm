// implement your posts router here
const express = require('express')
const router = express.Router()
const posts = require('./posts-model')



router.get('/', async (req,res)=>{
    let myposts = await posts.find()
    console.log(myposts)
    res.status(200).json(myposts)
})

router.get('/:id', async (req,res)=> {
    let mypost = await posts.findById(req.params.id)
    if(mypost){
    res.status(200).json(mypost) }
    else{
        res.status(404).json({message: 'does not exist'})
    }
})

router.post('/', async(req,res)=> {
    let mypost = req.body;
    try{
    let newid = await posts.insert(mypost)
    let newpost = await posts.findById(newid.id)
    res.status(201).json(newpost)
}
    catch(e){
        res.status(400).json({message: 'error happened'})
    }

    
})


router.put('/:id', async(req,res)=> {
    try{
        if(!req.body.title || ! req.body.contents){
            res.status(400).json({message: 'provide title and contents'})
        }
        let updated = await posts.update(req.params.id, req.body)
        let newpost = await posts.findById(req.params.id)
        if(updated){
            res.status(200).json(newpost)
        }
        else{
            res.status(404).json({message: 'does not exist'})
        }

    }
    catch(e){
      console.log(e.message)
    }

})


router.delete('/:id', async(req,res)=>{
    try{
    let temp = await posts.findById(req.params.id)
    let deleted = await posts.remove(req.params.id)
    if(deleted){
        res.status(200).json(temp)
    }
    else{
        res.status(404).json({message: 'does not exist'})
    }
}
catch(e){
    console.log(e.message)
}

})

router.get('/:id/comments', async (req,res)=>{
    let id = req.params.id
   let comments =  await posts.findPostComments(id)
   if(comments.length > 0){
       res.status(200).json(comments)
   }
   else{
       res.status(404).json({message: 'does not exist'})
   }
    
})

module.exports = router
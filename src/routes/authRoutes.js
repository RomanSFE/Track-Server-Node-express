const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User')
const router = express.Router()

router.post('/signup', async (req, res) =>{
    const {email, password} = req.body
    console.log('email, password ', email, password)

    if(!email || !password) return res.status(422).send({error: 'Must provide email and password'})

    try{
        const user = new User({email, password})
        await user.save();
        const token = jwt.sign({userId: user._id}, 'SECRET_KEY')
        res.send({ token })
    } catch (err){
        return res.status(422).send({error: 'Invalid request'})
    }
})

router.post('/signin', async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.status(422).send({error: 'Must provide email and password'})

    const user = await User.findOne({email: email})

    if(!user) return res.status(404).send({error: 'Email Not Found'})

     try{
        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id}, 'SECRET_KEY')
        res.send({ token })

     } catch(err){
        return res.status(422).send({error: 'Invalid credentials'})
     }
})

module.exports = router
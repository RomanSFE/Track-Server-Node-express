const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.comparePassword = function(candidatePassword){
    const user = this

    return new Promise((resolve, reject) =>{
        if(candidatePassword === user.password) {
            return resolve(true)
        }
        reject(false)
    })
}
mongoose.model('User', userSchema)
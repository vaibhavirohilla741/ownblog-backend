const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type:String,
        require: true
    },
    article:{
        type:String,
        require:true,
        
    },
    authorname:{
        type:String,
        require:true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    likes:{
        type:Number,
        ref:"User"
    }
})

const Articles = mongoose.model("Articles", articleSchema)

module.exports = Articles;
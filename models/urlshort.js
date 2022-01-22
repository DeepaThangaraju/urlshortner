import mongoose from 'mongoose';

const urlSchema=mongoose.Schema({
    longurl:{
        type:String,
        required:true
    },
    shorturl:{
        type:String,
        unique:true
    },
    clickcount:{
        type:Number,
        default:0
    }
})

export const urlModel=mongoose.model('urlshort',urlSchema);
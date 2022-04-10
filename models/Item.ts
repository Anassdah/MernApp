import mongoose from 'mongoose';
const Schema=mongoose.Schema ; 

const ItemSchema:any = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
});
export const Item:any = mongoose.model('item' , ItemSchema);

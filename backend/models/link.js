import mongoose from "mongoose";
const link = new mongoose.Schema(
  {proprety: {
    type: String,
    
  },
    rooms:  {type:String,},
    fromprice: { type: Number, },
    toprice: { type: Number, },
    contact: { type: Object,  },
    address:[],
   
    },{ timestamps: true }
    
    )

    export default mongoose.model("link", link);
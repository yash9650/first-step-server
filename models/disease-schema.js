import mongoose from "mongoose";


const DiseaseSchema = new mongoose.Schema({
    dName : String,
    symptoms: {
        type: Array
    },
    description: String,
    imageUrl : Array,
    remedies : Array,
    type: {
        type: String,
        enum : ['Chronic','Acute','Infectious','Hereditary','Deficiency','Physiological']
    },
    healthEffect: String,
    isCancerous: Boolean
})

const Disease = mongoose.model('Disease', DiseaseSchema);

export default Disease;
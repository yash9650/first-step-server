import mongoose from "mongoose";


const DiseaseSchema = new mongoose.Schema({
    dName : String,
    symptoms: Array,
    description: String,
    imageUrl : String,
    remedies : Array,
    type: {
        type: String,
        enum : ['Chronic','Acute','Infectious','Hereditary','Deficiency','Physiological']
    },
    healthEffect: String,
    isCancerous: Boolean
})

const disease = mongoose.model('Disease', DiseaseSchema);

export default disease;
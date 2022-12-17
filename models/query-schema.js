import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    feedback: String
});

const Query = mongoose.model('Query',querySchema);

export default Query;
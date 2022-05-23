import mongoose from 'mongoose';

const Dose = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    remedy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Remedy',
        required: true
    },
    administered: [String]
});

export default mongoose.model('Dose', Dose);
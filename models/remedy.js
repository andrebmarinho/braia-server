import mongoose from 'mongoose';

const Remedy = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    dosage: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

// Period in days
// Frequency: how many times per day

export default mongoose.model('Remedy', Remedy);
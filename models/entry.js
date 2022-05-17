import mongoose from 'mongoose';

const Entry = new mongoose.Schema({
    dateTime: {
        type: Date,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event',
        required: true
    },  
    description: {
        type: String,
        required: true,
        max: 100
    }
});

export default mongoose.model('Entry', Entry);
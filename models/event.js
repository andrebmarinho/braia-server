import mongoose from 'mongoose';

const Event = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        max: 100
    }
});

export default mongoose.model('Event', Event);
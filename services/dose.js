import Dose from '../models/dose.js';

export default class DoseService {
    static async count (query) {
        try {
            let itemsCount = 0;
            itemsCount = await Dose.count(query);
            return itemsCount;
        } catch (err) {
            console.log('DoseService Error - Count');
            throw err;            
        }
    }

    static async find (id, query, page, limit) {
        try {
            const skip = limit ? page * limit : null;
            let events = [];
            
            if (!id) {
                events = await Dose.find(query, null, limit ? { skip, limit } : {});
            } else {
                events = await Dose.findById(id);
            }

            return events;
        } catch (err) {
            console.log('DoseService Error - Find');
            throw err;
        }
    }

    static async create(event) {
        try {
            const newDose = await event.save();
            return newDose;
        } catch (err) {
            console.log('DoseService Error - Create');
            throw err;
        }
    }

    static async edit(id, event) {
        try {
            const newDose = await Dose.findByIdAndUpdate(id, event, {new: true});
            
            if (!newDose) {
                console.log('DoseService Error - Edit');
                throw Error(`Cannot edit Dose with id=${id}. Maybe this Dose was not found!`)
            }
            
            return newDose;
        } catch (err) {
            console.log('DoseService Error - Edit');
            throw err;
        }
    }

    static async remove(id) {
        try {
            const event = await Event.findByIdAndRemove(id);
            
            if (!event) {
                console.log('EventService Error - Delete');
                throw Error(`Cannot delete Event with id=${id}. Maybe this Event was not found!`)
            }

            return id;
        } catch (err) {
            console.log('EventService Error - Delete');
            throw err;
        }
    }
}
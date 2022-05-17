import Event from '../models/event.js';

export default class EventService {
    static async count (query) {
        try {
            let itemsCount = 0;
            itemsCount = await Event.count(query);
            return itemsCount;
        } catch (err) {
            console.log('EventService Error - Count');
            throw err;            
        }
    }

    static async find (id, query, page, limit) {
        try {
            const skip = limit ? page * limit : null;
            let events = [];
            
            if (!id) {
                events = await Event.find(query, null, limit ? { skip, limit } : {}).sort('description');
            } else {
                events = await Event.findById(id);
            }

            return events;
        } catch (err) {
            console.log('EventService Error - Find');
            throw err;
        }
    }

    static async create(event) {
        try {
            const newEvent = await event.save();
            return newEvent;
        } catch (err) {
            console.log('EventService Error - Create');
            throw err;
        }
    }

    static async edit(id, event) {
        try {
            const newEvent = await Event.findByIdAndUpdate(id, event, {new: true});
            
            if (!newEvent) {
                console.log('EventService Error - Edit');
                throw Error(`Cannot edit Event with id=${id}. Maybe this Event was not found!`)
            }
            
            return newEvent;
        } catch (err) {
            console.log('EventService Error - Edit');
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
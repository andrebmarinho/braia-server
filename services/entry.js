import Entry from '../models/entry.js';

export default class EntryService {
    static async count (query) {
        try {
            let itemsCount = 0;
            itemsCount = await Entry.count(query);
            return itemsCount;
        } catch (err) {
            console.log('EntryService Error - Count');
            throw err;            
        }
    }

    static async find (id, query, page, limit) {
        try {
            const skip = limit ? page * limit : null;
            let entries = [];
            
            if (!id) {
                entries = await Entry.find(query, null, limit ? { skip, limit } : {}).sort('dateTime description')
                    .populate('event').exec();
            } else {
                entries = await Entry.findById(id).populate('event').exec();
            }

            return entries;
        } catch (err) {
            console.log('EntryService Error - Find');
            throw err;
        }
    }

    static async create(entry) {
        try {
            const newEntry = await entry.save();
            return newEntry;
        } catch (err) {
            console.log('EntryService Error - Create');
            throw err;
        }
    }

    static async edit(id, entry) {
        try {
            const newEntry = await Entry.findByIdAndUpdate(id, entry, {new: true});
            
            if (!newEntry) {
                console.log('EntryService Error - Edit');
                throw Error(`Cannot edit Entry with id=${id}. Maybe this Entry was not found!`)
            }
            
            return newEntry;
        } catch (err) {
            console.log('EntryService Error - Edit');
            throw err;
        }
    }

    static async remove(id) {
        try {
            const entry = await Entry.findByIdAndRemove(id);
            
            if (!entry) {
                console.log('EntryService Error - Delete');
                throw Error(`Cannot delete Entry with id=${id}. Maybe this Entry was not found!`)
            }

            return id;
        } catch (err) {
            console.log('EntryService Error - Delete');
            throw err;
        }
    }
}
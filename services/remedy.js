import Remedy from '../models/remedy.js';

export default class RemedyService {
    static async count (query) {
        try {
            let itemsCount = 0;
            itemsCount = await Remedy.count(query);
            return itemsCount;
        } catch (err) {
            console.log('RemedyService Error - Count');
            throw err;            
        }
    }

    static async find (id, query, page, limit) {
        try {
            const skip = limit ? page * limit : null;
            let remedies = [];
            
            if (!id) {
                remedies = await Remedy.find(query, null, limit ? { skip, limit } : {}).sort('name');
            } else {
                remedies = await Remedy.findById(id);
            }

            return remedies;
        } catch (err) {
            console.log('RemedyService Error - Find');
            throw err;
        }
    }

    static async create(remedy) {
        try {
            const newRemedy = await remedy.save();
            return newRemedy;
        } catch (err) {
            console.log('RemedyService Error - Create');
            throw err;
        }
    }

    static async edit(id, remedy) {
        try {
            const newRemedy = await Remedy.findByIdAndUpdate(id, remedy, {new: true});
            
            if (!newRemedy) {
                console.log('RemedyService Error - Edit');
                throw Error(`Cannot edit Remedy with id=${id}. Maybe this Remedy was not found!`)
            }
            
            return newRemedy;
        } catch (err) {
            console.log('RemedyService Error - Edit');
            throw err;
        }
    }

    static async remove(id) {
        try {
            const remedy = await Remedy.findByIdAndRemove(id);
            
            if (!remedy) {
                console.log('RemedyService Error - Delete');
                throw Error(`Cannot delete Remedy with id=${id}. Maybe this Remedy was not found!`)
            }

            return id;
        } catch (err) {
            console.log('RemedyService Error - Delete');
            throw err;
        }
    }
}
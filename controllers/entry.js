import Service from '../services/entry.js';
import Entry from '../models/entry.js';

export default class EntryController {
    static async find(req, res, next) {
        const limitPerPage = req.query.limitPerPage ? parseInt(req.query.limitPerPage, 10) : null;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        const description = req.query.description;
        const event = req.query.event;

        const query = description ? 
            { description: { $regex: new RegExp(description), $options: 'i' } } : {};

        if (event) {
            query.event = event;
        }

        const id = req.params.id;

        console.info(`Entries | GET ${ id ? '| ' + id : ''}`);

        try {
            const response = await Service.find(id, query, page, limitPerPage);
            const itemsCount = id ? 1 : page === 0 ? await Service.count(query) : null;
            return res.status(200).json({ 
                status: 200, 
                result: response, 
                count: itemsCount,
                message: 'Success' 
            });
        } catch (err) {
            console.error('Error - GET Entries: ' + err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }

    static async create(req, res, next) {
        console.info('Entries | POST');

        const newEntry = new Entry(
            {
                dateTime: req.body.dateTime,
                event: req.body.event,
                description: req.body.description
            }
        );

        try {
            const entry = await Service.create(newEntry);
            return res.status(200).json({ 
                status: 200, 
                result: entry, 
                message: 'Success' 
            });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }

    static async edit(req, res, next) {
        console.info('Entries | POST');

        if (!req.body) {
            return res.status(400).send({
                message: 'Data to update cannot be empty!'
            });
        }
        
        const id = req.params.id;
        console.info('Entries | PUT | ' + id);

        try {
            const entry = await Service.edit(id, req.body);
            return res.status(200).json({ 
                status: 200, 
                result: entry, 
                message: 'Success' 
            });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }

    static async remove(req, res, next) {
        const id = req.params.id;
        console.info('Entries | DELETE | ' + id);

        try {
            const entry = await Service.remove(id);
            return res.status(200).json({ 
                status: 200, 
                result: entry, 
                message: 'Success' 
            });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }
}
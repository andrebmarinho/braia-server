import Service from '../services/event.js';
import Event from '../models/event.js';

export default class EventController {
    static async find(req, res, next) {
        const limitPerPage = req.query.limitPerPage ? parseInt(req.query.limitPerPage, 10) : null;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        const description = req.query.description;
        const query = description ? 
            { description: { $regex: new RegExp(description), $options: 'i' } } : {};

        const id = req.params.id;

        console.info(`Events | GET ${ id ? '| ' + id : ''}`);

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
            console.error('Error - GET Events: ' + err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }

    static async create(req, res, next) {
        console.info('Events | POST');

        const newEvent = new Event(
            {
                description: req.body.description
            }
        );

        try {
            const event = await Service.create(newEvent);
            return res.status(200).json({ 
                status: 200, 
                result: event, 
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

        if (!req.body) {
            return res.status(400).send({
                message: 'Data to update cannot be empty!'
            });
        }
        
        const id = req.params.id;
        console.info('Events | PUT | ' + id);

        try {
            const event = await Service.edit(id, req.body);
            return res.status(200).json({ 
                status: 200, 
                result: event, 
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
        console.info('Events | DELETE | ' + id);

        try {
            const event = await Service.remove(id);
            return res.status(200).json({ 
                status: 200, 
                result: event, 
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
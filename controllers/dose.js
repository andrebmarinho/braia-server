import Service from '../services/dose.js';
import Dose from '../models/dose.js';

export default class DoseController {
    static async find(req, res, next) {
        const limitPerPage = req.query.limitPerPage ? parseInt(req.query.limitPerPage, 10) : null;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        const date = req.query.date;
        const remedy = req.query.remedy;

        const query = {};

        if (remedy) {
            query.remedy = remedy;
        }

        if (date) {
            query.date = date;
        }

        const id = req.params.id;

        console.info(`Doses | GET ${ id ? '| ' + id : ''}`);

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
            console.error('Error - GET Doses: ' + err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }

    static async create(req, res, next) {
        console.info('Doses | POST');

        const newDose = new Entry(
            {
                date: req.body.date,
                remedy: req.body.remedy,
                doses: req.body.doses || []
            }
        );

        try {
            const entry = await Service.create(newDose);
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
        console.info('Doses | PUT');

        if (!req.body) {
            return res.status(400).send({
                message: 'Data to update cannot be empty!'
            });
        }
        
        const id = req.params.id;
        console.info('Doses | PUT | ' + id);

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
        console.info('Doses | DELETE | ' + id);

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
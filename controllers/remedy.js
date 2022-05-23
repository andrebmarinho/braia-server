import Service from '../services/remedy.js';
import Remedy from '../models/remedy.js';
import moment from 'moment';

export default class RemedyController {
    static async find(req, res, next) {
        const limitPerPage = req.query.limitPerPage ? parseInt(req.query.limitPerPage, 10) : null;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        const name = req.query.name;
        const dosage = req.query.dosage;
        const unit = req.query.unit;
        const frequency = req.query.frequency;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const date = req.query.date ? new Date(req.query.date) : null;

        let query = name ? 
            { name: { $regex: new RegExp(name), $options: 'i' } } : {};

        if (dosage) {
            query.dosage = dosage;
        }

        if (unit) {
            query.unit = { $regex: new RegExp(unit), $options: 'i' };
        }

        if (frequency) {
            query.frequency = frequency;
        }

        if (startDate) {
            query.startDate = startDate;
        }

        if (endDate) {
            query.endDate = endDate;
        }

        if (date) {
            const sd = moment(date).endOf('day');
            const ed = moment(date).startOf('day');
            query.startDate = { $lte: sd };
            query.endDate = { $gte: ed };
        }

        const id = req.params.id;

        console.info(`Remedies | GET ${ id ? '| ' + id : ''}`);

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
            console.error('Error - GET Remedies: ' + err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }

    static async create(req, res, next) {
        console.info('Remedies | POST');
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);

        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        endDate.setHours(0);
        endDate.setMinutes(0);
        endDate.setSeconds(0);

        const newRemedy = new Remedy(
            {
                name: req.body.name,
                dosage: req.body.dosage,
                unit: req.body.unit,
                frequency: req.body.frequency,
                startDate: startDate,
                endDate: endDate
            }
        );

        try {
            const remedy = await Service.create(newRemedy);
            return res.status(200).json({ 
                status: 200, 
                result: remedy, 
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
        console.info('Remedies | POST');

        if (!req.body) {
            return res.status(400).send({
                message: 'Data to update cannot be empty!'
            });
        }
        
        const id = req.params.id;
        console.info('Remedies | PUT | ' + id);

        try {
            const remedy = await Service.edit(id, req.body);
            return res.status(200).json({ 
                status: 200, 
                result: remedy, 
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
        console.info('Remedies | DELETE | ' + id);

        try {
            const remedy = await Service.remove(id);
            return res.status(200).json({ 
                status: 200, 
                result: remedy, 
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
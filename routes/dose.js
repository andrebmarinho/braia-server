import DoseController from '../controllers/dose.js';

export default {
    loadRouter: (router) => {
        router
            .get('/', DoseController.find)
            .get('/:id', DoseController.find)
            .post('/', DoseController.create)
            .put('/:id', DoseController.edit)
            .delete('/:id', DoseController.remove);

        return router;
    }
}
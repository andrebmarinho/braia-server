import RemedyController from '../controllers/remedy.js';

export default {
    loadRouter: (router) => {
        router
            .get('/', RemedyController.find)
            .get('/:id', RemedyController.find)
            .post('/', RemedyController.create)
            .put('/:id', RemedyController.edit)
            .delete('/:id', RemedyController.remove);

        return router;
    }
}
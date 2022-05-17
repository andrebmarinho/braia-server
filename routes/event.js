import EventController from '../controllers/event.js';

export default {
    loadRouter: (router) => {
        router
            .get('/', EventController.find)
            .get('/:id', EventController.find)
            .post('/', EventController.create)
            .put('/:id', EventController.edit)
            .delete('/:id', EventController.remove);

        return router;
    }
}
import EntryController from '../controllers/entry.js';

export default {
    loadRouter: (router) => {
        router
            .get('/', EntryController.find)
            .get('/:id', EntryController.find)
            .post('/', EntryController.create)
            .put('/:id', EntryController.edit)
            .delete('/:id', EntryController.remove);

        return router;
    }
}
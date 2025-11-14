const { Router } = require('express');
const {
    notificationsGet,
    notificationGetById,
    notificationPost,
    notificationPut,
    notificationDelete
} = require('../controllers/notifications.controller');

const router = Router();

router.get('/', notificationsGet);
router.get('/:id', notificationGetById);
router.post('/', notificationPost);
router.put('/:id', notificationPut);
router.delete('/:id', notificationDelete);

module.exports = router;

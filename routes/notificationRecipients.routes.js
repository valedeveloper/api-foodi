const { Router } = require('express');
const {
    notificationRecipientsGet,
    notificationRecipientGetById,
    notificationRecipientPost,
    notificationRecipientPut,
    notificationRecipientDelete
} = require('../controllers/notificationRecipients.controller');

const router = Router();

router.get('/', notificationRecipientsGet);
router.get('/:id', notificationRecipientGetById);
router.post('/', notificationRecipientPost);
router.put('/:id', notificationRecipientPut);
router.delete('/:id', notificationRecipientDelete);

module.exports = router;

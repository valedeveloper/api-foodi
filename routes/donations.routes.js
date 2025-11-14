const { Router } = require('express');
const {
    donationsGet,
    donationGetById,
    donationPost,
    donationPut,
    donationDelete
} = require('../controllers/donations.controller');

const router = Router();

router.get('/', donationsGet);
router.get('/:id', donationGetById);
router.post('/', donationPost);
router.put('/:id', donationPut);
router.delete('/:id', donationDelete);

module.exports = router;

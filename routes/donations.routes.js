const { Router } = require('express');
const {
    donationsGet,
    donationGetById,
    donationPost,
    donationPut,
    donationDelete,
    getDonationsByMonth
} = require('../controllers/donations.controller');

const router = Router();

router.get('/', donationsGet);
router.get('/:id', donationGetById);
router.post('/', donationPost);
router.put('/:id', donationPut);
router.delete('/:id', donationDelete);
router.get("/analytics/by-month", getDonationsByMonth);

module.exports = router;

const { Router } = require('express');
const {
    foodBanksGet,
    foodBankGetById,
    foodBankPost,
    foodBankPut,
    foodBankDelete,
    getDonationsByFoodBank
} = require('../controllers/foodBanks.controller');

const router = Router();

router.get('/', foodBanksGet);
router.get('/:id', foodBankGetById);
router.post('/', foodBankPost);
router.put('/:id', foodBankPut);
router.delete('/:id', foodBankDelete);
router.get("/analytics/by-foodbank", getDonationsByFoodBank);


module.exports = router;

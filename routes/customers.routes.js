const { Router } = require("express")
const {
    customerGet, customerGetById, customerPost, customerPut, customerDelete
} = require('../controllers/customers.controller')

const router = Router()

router.get('/', customerGet);
router.get('/:id', customerGetById);
router.post('/', customerPost);
router.put('/:id', customerPut);
router.delete('/:id', customerDelete);


module.exports = router;
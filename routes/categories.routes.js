const { Router } = require('express');
const {
    categoriesGet,
    categoryGetById,
    categoryPost,
    categoryPut,
    categoryDelete
} = require('../controllers/categories.controller');

const router = Router();

router.get('/', categoriesGet);
router.get('/:id', categoryGetById);
router.post('/', categoryPost);
router.put('/:id', categoryPut);
router.delete('/:id', categoryDelete);

module.exports = router;

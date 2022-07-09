const Router = require('express');
const router = new Router();
const shopController = require("../controllers/shopController");
const checkRole = require("../middleware/CheckRoleMiddleware");

router.post('/', checkRole('ADMIN'), shopController.create);
router.get('/', shopController.getAll);
router.get('/:id', shopController.getById);

module.exports = router;
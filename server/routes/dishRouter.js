const Router = require('express');
const router = new Router();
const dishController = require("../controllers/dishController");
const checkRole = require("../middleware/CheckRoleMiddleware");

router.post('/', checkRole('ADMIN'), dishController.create);
router.get('/', dishController.getAll);

module.exports = router;
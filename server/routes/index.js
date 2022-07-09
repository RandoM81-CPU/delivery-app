const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const dishRouter = require('./dishRouter');
const shopRouter = require('./shopRouter');
const orderRouter = require('./orderRouter');

router.use('/user', userRouter);
router.use('/dish', dishRouter);
router.use('/shop', shopRouter);
router.use('/order', orderRouter);

module.exports = router;
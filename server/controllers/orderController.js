const {Order, Cart} = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderController {
  async create(req, res, next) {
    try {
      let {totalPrice, name, email, phoneNumber, address, dishes} = req.body;

      const cart = await Cart.create();

      const order = await Order.create({totalPrice, name, email, phoneNumber, address, cartId: cart.id, dishes});

      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new OrderController();
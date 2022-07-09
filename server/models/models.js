const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Cart = sequelize.define("cart", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const CartDish = sequelize.define("cart_dish", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Dish = sequelize.define("dish", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING},
  price: {type: DataTypes.FLOAT},
  img: {type: DataTypes.STRING}
})

const Shop = sequelize.define("shop", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING}
})

const Order = sequelize.define("order", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  totalPrice: {type: DataTypes.FLOAT},
  name: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, unique: true},
  phoneNumber: {type: DataTypes.STRING},
  address: {type: DataTypes.STRING},
})

Shop.hasMany(Dish, {as: "dishes"});
Dish.belongsTo(Shop);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Dish, {through: CartDish});
Dish.belongsToMany(Cart, {through: CartDish});

Order.hasOne(Cart);
Cart.belongsTo(Order);

module.exports = {
  User, Cart, CartDish, Dish, Shop, Order
}
const {Dish} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class DishController{
  async create(req, res, next){
    try{
      const {title, shopId, price} = req.body;
      const {img} = req.files;
      let fileName = uuid.v4()+".jpg";

      await img.mv(path.resolve(__dirname, "..\\..\\client\\public\\static", fileName));

      const dish = await Dish.create({title, shopId, price, img: fileName});

      return res.json(dish);
    }catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res){
    const {shopId} = req.query;
    let dishes;
    if(shopId){
      dishes = await Dish.findAll({where: {shopId}});
    }
    return res.json(dishes);
  }
}

module.exports = new DishController();
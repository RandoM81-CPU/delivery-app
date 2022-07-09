const {Shop, Dish} = require("../models/models");
const ApiError = require("../error/ApiError");

class ShopController{
  async create(req, res, next){
    try{
      let {id, title, dishes} = req.body;

      const shop = await Shop.create({id, title});

      if(dishes){
        dishes = JSON.parse(dishes);
        dishes.forEach(i => Dish.create({
          id: i.id,
          title: i.title,
          shopId: shop.id,
          price: i.price,
          img: i.img,
        }))
      }

      return res.json(shop);
    }catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res){
    const shops = await Shop.findAll();
    return res.json(shops);
  }

  async getById(req, res){
    const {id} = req.query;
    let shop;
    if(id){
      shop = await Dish.findOne({where: {id}});
    }
    return res.json(shop);
  }
}

module.exports = new ShopController();
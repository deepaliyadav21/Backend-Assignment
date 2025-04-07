const express = require("express");
const router = express.Router();

const restaurantController = require('../Controllers/restaurantController');

router.post("/add-Restaurant",restaurantController.addRestaurant);
router.get("/Restaurants",restaurantController.getAllRestaurant);
router.get("/Restaurants/:id",restaurantController.getRestaurant);
router.get("/myRestaurants/:id",restaurantController.getMyRestaurants);
router.delete("/delete/:id",restaurantController.deleteRestaurant);
router.put("/update/:id",restaurantController.updateRestaurant);
router.put("/updatestatus/:id",restaurantController.updateRestaurantStatus);
router.get("/restaurant/menu/:id",restaurantController.getMenu);

module.exports  = router

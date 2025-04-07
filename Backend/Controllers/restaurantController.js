const Restaurant = require("../Models/Restaurant");

// Add Restaurant
exports.addRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error("Error adding Restaurant:", error);
    res.status(500).json({ message: "Failed to add Restaurant", error });
  }
};

// Get All Active Restaurants
exports.getAllRestaurant = async (req, res) => {
  try {
    const Restaurants = await Restaurant.find({ status: true });
    console.log(Restaurants)
    if (Restaurants.length === 0) {
      return res.status(404).json({ message: "No active Restaurants found" });
    }
    res.status(200).json(Restaurants);
  } catch (error) {
    console.error("Error fetching Restaurants:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Single Restaurant
exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error fetching Restaurant:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Restaurants by User
exports.getMyRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ userId: req.params.id });
    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No Restaurant found for this user" });
    }
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching user restaurants:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting Restaurants:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurants updated", updated });
  } catch (error) {
    console.error("Error updating Restaurant:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Toggle Restaurants Status
exports.updateRestaurantStatus = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    restaurant.status = !restaurant.status;
    await restaurant.save();

    res.status(200).json({ message: "Status updated", restaurant });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Menu (Recipes)
exports.getMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.status(200).json({ menu: restaurant.recipes || [] });
  } catch (error) {
    console.error("Error getting menu:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

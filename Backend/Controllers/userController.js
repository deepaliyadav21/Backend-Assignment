const User = require("../Models/User");

// Create User
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    let savedUser = await newUser.save();
    
    // Remove password from the response
    savedUser = savedUser.toObject();
    delete savedUser.password;

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error });
  }
};

// Get User by Email and Password
exports.getUserByMailPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const foundUser = await User.findOne({ email, password });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = foundUser.toObject();
    delete userData.password;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get User by Email Only
exports.getByMail = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = foundUser.toObject();
    delete userData.password;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = foundUser.toObject();
    delete userData.password;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

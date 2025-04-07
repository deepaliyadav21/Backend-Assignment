// const product = require("../Models/Product")
// exports.addProduct = async(req,res)=>{
//     let result = new product(req.body);
//     let data = await result.save();
//     res.send(data);
// }
  

// exports.getAllProducts = async(req,res)=>{
//     let result = await product.find({status:true});
//     if(result)
//     {
//     res.send(result);
//     }
//     else
//     {
//             res.send({result:"no Product Found"})
//     }
// }

// exports.updateRestaurantStatus = async(req,res)=>{
//     const { id } = req.params;
//     try {
//       const result = await product.findById(id);
//       if (!result) {
//           return res.status(404).json({ message: 'Item not found' });
//         }
//         // Toggle the status
//         result.status = !result.status;
        
//         await result.save();
        
//         console.log(result)
//         res.send({ message: 'Status updated', result });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
// }

// exports.getMenu = async(req,res)=>{
//     const { id } = req.params;
//     try {
//       const result = await product.findById(id);
//       if (!result) {
//           return res.status(404).json({ message: 'Item not found' });
//         }
//         // Toggle the status
//         const menu =result.recipes;
//         res.send(menu);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
// }


// exports.getProduct = async(req,res)=>{
//     let result = await product.findById(req.params.id);
//     if(result)
//     {
//     res.send(result);
//     }
//     else
//     {
//             res.send({result:"no Product Found"})
//     }
// }


// exports.getMyProducts = async(req,res)=>{
//     let result = await product.find({userId : req.params.id});
    
//     if(result.length>0)
//     {
//     res.send(result);
//     }
//     else
//     {
//             res.send({result:"no Product Found"})
//     }
// }

// exports.deleteProduct = async(req,res)=>{
//     let result =  await product.findByIdAndDelete(req.params.id)
//     res.send(result);
// }

// exports.updateProduct = async(req,res)=>{
//     console.log(req.body)
//     let result = await product.updateOne(
//             {_id:req.params.id},
//             {$set:req.body}
//     )
//     if(result)
//     {
//             res.send(result)
//     }
//     else
//     {
//             console.log("not founf")
//             res.send({result:"not found"});
//     }
// }




const Product = require("../Models/Product");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product", error });
  }
};

// Get All Active Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: true });
    if (products.length === 0) {
      return res.status(404).json({ message: "No active products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Single Product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Products by User
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.id });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this user" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching user products:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated", updated });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Toggle Product Status
exports.updateRestaurantStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.status = !product.status;
    await product.save();

    res.status(200).json({ message: "Status updated", product });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Menu (Recipes)
exports.getMenu = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ menu: product.recipes || [] });
  } catch (error) {
    console.error("Error getting menu:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

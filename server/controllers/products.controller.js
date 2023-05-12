import Post from "../models/Post.js";
import { uploadImage, deleteImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getProducts = async (req, res) => {
  try {
    const products = await Post.find();
    res.send(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProducts = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      await fs.remove(req.files.image.tempFilePath)
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }
    const newProduct = new Post({ title, description, image });
    await newProduct.save();
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const updatedProduct = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.send(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProducts = async (req, res) => {
    try {
        const productRemoved = await Post.findByIdAndDelete(req.params.id);
        console.log(productRemoved)
        if (!productRemoved) return res.send("404 Product Not Found");
        if (productRemoved.image.public_id) {
          await deleteImage(productRemoved.image.public_id)
        }
        return res.send("Product deleted succesfully!");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await Post.findById(req.params.id);
        if (!product) return res.send("404 Product Not Found");
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

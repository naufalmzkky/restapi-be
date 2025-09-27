const { Product } = require("../models");

const createProduct = async (req, res, next) => {
  try {
    const { CategoryId, name, sku, description, stock, price } = req.body;

    const create = await Product.create({
      CategoryId,
      name,
      sku,
      description,
      stock,
      price,
    });

    res.status(201).json({
      message: "Product berhasil dibuat",
      create,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findAll();

    if (product.length === 0) {
      return res.status(404).json({
        message: "Product tidak ditemukan",
      });
    }
    res.status(200).json({
      message: "Product ditemukan",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const { CategoryId, name, sku, description, stock, price } = req.body;

    const checkProduct = await Product.findByPk(productId);

    if (!checkProduct) {
      return res.status(404).json({
        message: "Product tidak ditemukan",
      });
    }

    checkProduct.CategoryId = CategoryId ?? checkProduct.CategoryId;
    checkProduct.name = name ?? checkProduct.name;
    checkProduct.sku = sku ?? checkProduct.sku;
    checkProduct.description = description ?? checkProduct.description;
    checkProduct.stock = stock ?? checkProduct.stock;
    checkProduct.price = price ?? checkProduct.price;

    await checkProduct.save();

    res.status(200).json({
      message: "Product berhasil diupdate",
      checkProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id: productId } = req.params;

    const checkProduct = await Product.findByPk(productId);

    if (!checkProduct) {
      return res.status(404).json({
        message: "Product tidak ditemukan",
      });
    }

    await checkProduct.destroy();

    res.status(200).json({
      message: "Product berhasil dihapus",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct, getProduct, updateProduct, deleteProduct };

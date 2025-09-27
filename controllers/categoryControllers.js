const { Category } = require("../models");

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const create = await Category.create({
      name,
      description,
    });

    res.status(201).json({
      message: "Category berhasil dibuat",
      create,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findAll();

    if (category.length === 0) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Category ditemukan",
      category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;
    const { name, description } = req.body;

    const checkCategory = await Category.findByPk(categoryId);

    if (!checkCategory) {
      return res.status({
        messsage: "Category tidak ditemukan",
      });
    }
    checkCategory.name = name ?? checkCategory.name;
    checkCategory.description = description ?? checkCategory.description;

    await checkCategory.save();
    res.status(200).json({
      message: "Category berhasil diubah",
      checkCategory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;

    const checkCategory = await Category.findByPk(categoryId);
    if (!checkCategory) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }
    await checkCategory.destroy();
    res.status(201).json({
      message: "Category berhasil dihapus",
      checkCategory,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};

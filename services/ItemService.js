const ItemModel = require("../models/ItemModel.js");

// Create inventory items
exports.createItem = (req, res) => {
  const { name, price, description, category, quantity } = req.body;
  if (!name || !price) {
    res.status(400).json({
      message: `name, price & category field are mandatory`,
    });
  }

  const newItem = new ItemModel(req.body);
  console.log(newItem);
  newItem
    .save()
    .then((item) => {
      res.json({
        message: "create a product",
        data: item,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error---> ${err}`,
      });
    });
};

// View a list of them
exports.getItems = (req, res) => {
  ItemModel.find()
    .where("is_deleted")
    .equals(false)
    .then((items) => {
      res.json({
        message: `all items`,
        length: items.length,
        data: items,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error----> ${err}`,
      });
    });
};

// Edit Them
exports.updateItem = (req, res) => {
  ItemModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => {
      if (item) {
        res.json({
          message: `updated`,
          data: item,
        });
      } else {
        res.status(400).json({
          message: `there is no item with the id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error--->${err}`,
      });
    });
};

// Delete Them
exports.deleteItem = (req, res) => {
  ItemModel.findByIdAndUpdate(
    req.params.id,
    { is_deleted: true },
    { new: true }
  )
    .then((item) => {
      if (item) {
        res.json({
          message: `The item with the id ${req.params.id} was deleted`,
        });
      } else {
        res.status(400).json({
          message: `no item with the id ${req.params.id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error-->${err}`,
      });
    });
};

// View a list of deleted items
exports.getDeletedItems = (req, res) => {
  ItemModel.find()
    .where("is_deleted")
    .equals(true)
    .then((items) => {
      res.json({
        message: `deleted items`,
        length: items.length,
        data: items,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error----> ${err}`,
      });
    });
};

// unDelete Them
exports.unDeleteItem = (req, res) => {
  ItemModel.findByIdAndUpdate(
    req.params.id,
    { is_deleted: false },
    { new: true }
  )
    .then((item) => {
      if (item) {
        res.json({
          message: `The item with the id ${req.params.id} was unDeleted`,
        });
      } else {
        res.status(400).json({
          message: `no item with the id ${req.params.id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error-->${err}`,
      });
    });
};

const express = require("express");
const router = express.Router();
const itemService = require("../services/ItemService.js");

router.post("/", itemService.createItem);
router.get("/", itemService.getItems);
router.get("/deleted", itemService.getDeletedItems);
router.put("/:id", itemService.updateItem);
router.put("/undelete/:id", itemService.unDeleteItem);
router.delete("/:id", itemService.deleteItem);

module.exports = router;

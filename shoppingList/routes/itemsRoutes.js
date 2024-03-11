const express = require("express");

const {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
} = require("../controllers/items.controllers");

const router = express.Router();

router.route("/").post(createItem).get(getAllItems);
router.route("/:id").get(getItem).delete(deleteItem).patch(updateItem);

module.exports = router;

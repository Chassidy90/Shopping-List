const express = require("express");
const router = express.Router();

const {
    getAllItem,
    getItem,
    createItem,
    updateItem,
    deleteItem,
} = require("../controllers/items");

router.route("/").post(createItem).get(getAllItem);
router.route("/:id").get(getItem).delete(deleteItem).patch(updateItem);

module.exports = router;
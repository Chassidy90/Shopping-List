const Item = require("../models/Item.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { createApi } = require("unsplash-js");

const unsplashApi = createApi({
    accessKey: process.env.unsplashAccessKey,
});

const { createApi } = require("unsplash-js");
const ItemModel = require("../models/Item.model");

async function createItem(req, res) {
    try {
        let item = req.body;

        const randomPhoto = await unsplashApi.photos.getRandom({
            query: item.name,
        });

        item.image = randomPhoto.response.urls.small;

        const newItem = await Item.create(item);

        res.status(StatusCodes.CREATED).json({ newItem });
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllItems = async (req, res) => {
    const items = await Item.find();
    res.status(StatusCodes.OK).json({ items, count: items.length });
};

const getItem = async (req, res) => {
    const {
        params: { id: itemId },
    } = req;
    const item = await Item.findOne({
        _id: itemId,
    });
    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`);
    }
    res.status(StatusCodes.OK).json({ item });
};

async function createItem(req, res) {
    try {
        let item = req.body;

        const randomPhoto = await unsplashApi.photos.getRandom({
            query: item.name,
        });

        item.image = randomPhoto.response.urls.small;

        const newItem = await Item.create(item);

        res.status(StatusCodes.CREATED).json({ newItem });
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateItem = async (req, res) => {
    const {
        body: { name, description, price, category },
        params: { id: itemId },
    } = req;

    if (name === "" || description === "" || price === "" || category === "") {
        throw new BadRequestError(
            "name, description, price and category fields cannot be empty"
        );
    }

    let item = req.body;

    const randomPhoto = await unsplashApi.photos.getRandom({
        query: item.name,
    });

    item.image = randomPhoto.response.urls.small;

    const newItem = await Item.findByIdAndUpdate({ _id: itemId }, item, {
        new: true,
        runValidators: true,
    });
    if (!newItem) {
        throw new NotFoundError(`No item with id ${itemId}`);
    }
    res.status(StatusCodes.OK).json({ newItem });
};

const deleteItem = async (req, res) => {
    const {
        params: { id: itemId },
    } = req;

    const item = await Item.findOneAndDelete({
        _id: itemId,
    });
    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`);
    }
    res.status(StatusCodes.OK).send(`Deleted item with id ${itemId}`);
};

module.exports = {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
};

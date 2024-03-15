const Item = require("../models/Item.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const axios = require ('axios')

import { createApi } from 'unsplash-js';

unsplash.getPhotos().then(result => {
    if (result.errors) {
      console.log('error occurred: ', result.errors[0]);
    } else {
      const feed = result.response;
  
      const { total, results } = feed;
  
     
      console.log(`received ${results.length} photos out of ${total}`);
      console.log('first photo: ', results[0]);
    }
  });



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

const createItem = async (req, res) => {
    const item = await Item.create(req.body);
    res.status(StatusCodes.CREATED).json({ item });
};

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
    const item = await Item.findByIdAndUpdate({ _id: itemId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`);
    }
    res.status(StatusCodes.OK).json({ item });
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

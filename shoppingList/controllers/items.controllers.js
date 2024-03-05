// const Item = require("../models/Jobs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require('../errors');

const getAllItems = async (req, res) => {
    const items = await Item.find(
    );
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
// const updateJob = async (req, res) => {
//     const {
//         body: { title, description },
//         user: { userId },
//         params: { id: jobId },
//     } = req;

//     if (title === "" || description === "") {
//         throw new BadRequestError(
//             "title and description fields cannot be empty"
//         );
//     }
//     const job = await Job.findByIdAndUpdate(
//         { _id: jobId, createdBy: userId },
//         req.body,
//         { new: true, runValidators: true }
//     );
//     if (!job) {
//         throw new NotFoundError(`No job with id ${jobId}`);
//     }
//     res.status(StatusCodes.OK).json({ job });
// };
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
    // updateItem,
    deleteItem,
};

const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');
const { query } = require('express');


module.exports.getAll = async function (req, res) {
    const query = {
        user: req.user.id
    };

    if (req.query.start) {
        query.date = {
            $gte: req.query.start //$gte - from mangoose, больше или равно
        }
    }

    if (req.query.end) {
        if (!query.date) {
            query.date = {};
        }

        query.date['$lte'] = req.query.end; //$lte - from mangoose, больше или равно
    }

    if (req.query.order) {
        query.order = +req.query.order;
    }

    try {
        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit);

        res.status(200).json(orders);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.create = async function (req, res) {
    try {
        const lastOrder = await Order
            .findOne({user: req.user.id})
            .sort({date: -1});
        const maxOrder = lastOrder ? lastOrder.order : 0;

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save();

        res.status(201).json(order);
    } catch (error) {
        errorHandler(res, error);
    }
}

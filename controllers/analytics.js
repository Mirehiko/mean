const moment = require('moment');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');


module.exports.overview = async function (req, res) {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort(1);
        const ordersMap = getOrdersMap(allOrders);
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];

        // Количество заказов
        const totalOrdersNumber = allOrders.length;
        // Количество заказов вчера
        const yesterdayOrdersNumber = yesterdayOrders.length;
        // Количество дней всего
        const daysNumber = Object.keys(ordersMap).length;
        // Заказов в день
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);
        // Процент для количества заказов
        // ((заказов вчера / кол-во заказов в день) - 1) * 100
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) -1) * 100).toFixed(2);
        // Общая выручка
        const totalGain = calculatePrice();
        // Выручка в день
        const gainPerDay = totalGain / daysNumber;
        // Выручка за вчера
        const yesterdayGain = calculatePrice(yesterdayOrders);
        // Процент выручки
        const gainPercent = (((yesterdayGain / gainPerDay) -1) * 100).toFixed(2);
        // Сравнение выручки
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2);
        // Сравнение кол-ва заказов
        const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2);

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHigher: +gainPercent > 0,
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareNumber),
                yesterday: +yesterdayOrdersNumber,
                isHigher: +ordersPercent > 0,
            }
        });
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.analytics = async function (req, res) {
    try {

    } catch (error) {
        errorHandler(res, error);
    }
}

function getOrdersMap(orders = []) {
    const dayasOrders = {};
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY');

        if (!dayasOrders[date]) {
            dayasOrders[date] = [];
        }
        dayasOrders[date].push(order);
    });

    return dayasOrders;
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantity;
        });
        return total += orderPrice;
    }, 0);
}

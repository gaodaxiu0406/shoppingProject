let express = require('express');
let router = express.Router();
let { Order } = require('../database/model');

// 服务器重启时,查询当前数据库中订单号最大值,然后加1作为下一个订单的订单号
let orderNumber;
Order.find()
    .sort({ orderNumber: -1 })
    .limit(1)
    .exec((err, docs) => {
        if (docs.length) {
            orderNumber = docs[0].orderNumber + 1;
        } else {
            orderNumber = 100001;
        }
    })
// 提交订单,增加订单
router.post('/addOrder', (req, res) => {
    console.log('增加订单');
    // console.log(req.body);//post方法传递的数据在req.body中,get方法传递的数据在req.query中
    let { productName, count, purchaser } = req.body;//前端提交的数据包括购买人,商品名称,数量等信息
    let createAt = Date.now();
    // let cookie = req.headers.cookie;
    // let cookieObj = querystring.parse(cookie, ';');
    // let purchaser = cookieObj.username;//购买人从cookie读取当前登录的用户
    console.log(purchaser, productName, count, createAt, orderNumber);
    Order.create({ purchaser, productName, count, createAt, state: 0, orderNumber }, (err, doc) => {
        console.log('增加订单号', orderNumber);
        if (err) {
            console.log(err);
            res.send(JSON.stringify({
                code: 0,
                msg: "服务器内部错误",
            }))
        } else {
            res.send(JSON.stringify({
                code: 1,
                msg: "订单提交成功",
                orderNumber: orderNumber++
            }))
        }
    })
})

// 订单列表
router.get('/getOrderList', (req, res) => {
    console.log('订单列表');
    let { purchaser, ordertype } = req.query;//ordertype表示的是要获取订单的状态种类,已完成0,未付款1,全部
    console.log('购买人:', purchaser, '订单类型:', ordertype);
    let according;
    if (ordertype == 0 || ordertype == 1) {
        according = { state: ordertype, purchaser }
    } else {
        according = { purchaser };
    }
    Order.find(according)
        .populate('productName')
        .populate('purchaser')
        .sort({ createAt: -1 })
        .limit(8)
        .exec((err, doc) => {
            let result = [];
            // let createAt=createAt.toLocalString();
            console.log(doc);
            doc.length && doc.forEach((item, index) => {
                var { productName, count, createAt, orderNumber, state } = item;
                var { productName, productImg, describe, price } = productName;
                var data = { productName, productImg, describe, price, count, createAt, orderNumber, state };
                result.push(data);
            })
            console.log(result);
            res.send(JSON.stringify(result));
        })
})

// 订单详情
router.get('/orderDetail', (req, res) => {
    console.log('订单详情');
    let { orderNumber, purchaser } = req.query;
    console.log('orderNumber', orderNumber, 'purchaser', purchaser);
    Order.find({ orderNumber, purchaser })
        .populate('productName')
        .populate('purchaser')
        .exec((err, doc) => {
            if (err) {
                res.send(JSON.stringify({ code: 0, msg: '发生错误!' }));
            } else {
                let result = [];
                doc.forEach((item, index) => {
                    var { productName, count, createAt, orderNumber, state } = item;
                    var { productName, productImg, price } = productName;
                    // 2017-08-22T12:04:03.674Z utc时间格式,和本地时间差8小时
                    var data = { productName, productImg, price, count, createAt, orderNumber, state };
                    result.push(data);
                })
                console.log(result);
                res.send(JSON.stringify(result));
            }
        })
}
)

// 删除订单
router.get('/deleteOrder', (req, res) => {
    console.log('删除订单');
    let { orderNumber, purchaser } = req.query;
    console.log(orderNumber, purchaser);
    Order.remove({ orderNumber, purchaser }, (err, result) => {
        if (err) {
            res.send(JSON.stringify({
                code: 0,
                msg: '服务器内部错误!'
            }))
        } else {
            console.log(result.result);//{ok:1,n:1}表示ok=1删除成功,n=1表示删掉1条记录
            if (result.result.ok == 1 && result.result.n > 0) {
                res.send(JSON.stringify({
                    code: 1,
                    msg: '删除成功!'
                }));
            } else {
                res.send(JSON.stringify({
                    code: 0,
                    msg: '删除失败!'
                }))
            }
        }
    })
})


// 付款
router.post('/payOrder', (req, res) => {
    console.log('付款');
    let { orderNumber } = req.body;
    console.log('付款订单号', orderNumber);
    Order.update({ orderNumber }, { state: 1 }, (err, doc) => {
        if (err) {
            res.send(JSON.stringify({ code: 0, msg: '付款失败!' }));
        } else {
            res.send(JSON.stringify({ code: 1, msg: '付款成功!' }));
        }
    })
})


module.exports = router;

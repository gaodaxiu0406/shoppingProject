let express = require('express');
let router = express.Router();
let { Product } = require('../database/model');

// 商品列表
router.get("/productList", (req, res) => {
    console.log(req.query);
    type = decodeURI(req.query.type);
    console.log(type);
    let findByType = (type) => Product.find({ type })
        .limit(18)
        .exec((err, doc) => {
            console.log(doc);
            res.send(JSON.stringify(doc));
        })
    switch (type) {
        case "northeast":
            findByType('东北特产');
            break;
        case 'north':
            findByType('华北特产');
            break;
        case 'south':
            findByType('华南特产');
            break;
        case 'other':
            findByType('其它');
            break;
        default:
            Product.find()
                .sort({ sales: -1 })
                .limit(18)
                .exec((err, doc) => {
                    res.send(JSON.stringify(doc));
                })
    }
})
// 购物车
router.get('/shoppingCar', (req, res) => {
    console.log('购物车');

})
// 查询商品详情
router.get('/productDetail', (req, res) => {
    let _id=req.query._id;
    console.log('商品详情:_id',_id);
    Product.find({ _id }, (err, doc) => {
        if (err) {
            console.log(err);
        }
        res.send(JSON.stringify(doc));
    });

})
// 热销列表
router.get('/getHotList', (req, res) => {
    console.log('热销列表');
    Product.find()
        .sort({ sales: -1 })
        .limit(20)
        .exec((err, doc) => {
            // console.log(doc);
            res.send(JSON.stringify(doc));
        })
})
module.exports = router;
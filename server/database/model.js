//引入mongoose
let mongoose = require('mongoose');
mongoose.Promise = Promise;
//定义外键
let ObjectId = mongoose.Schema.Types.ObjectId;
//创建数据库连接
let conn = mongoose.createConnection('mongodb://127.0.0.1/shopping');
//搭建骨架模型
    //1.用户
let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String,
});
    //2.商品
let ProductSchema = new mongoose.Schema({
    productName:String,
    price:Number,
    sales:Number,
    spec:String,
    type:String,
    describe:String,
    expTime:String,
    productImg:String,
});
    //3.订单
let OrderSchema = new mongoose.Schema({
    createAt:{type:Date,default:Date.now()},
    state:Number,
    purchaser:{type:ObjectId,ref:'User'},
    productName:{type:ObjectId,ref:'Product'},
    count:Number,
    orderNumber:Number
});
//定义用户模型
let User = conn.model('User',UserSchema);
let Product = conn.model('Product',ProductSchema);
let Order = conn.model('Order',OrderSchema);

exports.User=User;
exports.Product=Product;
exports.Order=Order;

let express=require('express');
let path=require('path');
// 引入session中间件
let session = require('express-session');
// 使用MongoDB存储会话session的中间件,返回一个函数,需要执行并传入session
let MongoStore=require('connect-mongo')(session);
let app=express();
 
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

let index=require('./routes/index');
let userRouter=require('./routes/userRouter');
let productRouter=require('./routes/productRouter');
let orderRouter=require('./routes/orderRouter');
let bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(session({ //使用此中间件之后,会多一个req.session属性
    resave: true, //每次重新保存session
    saveUninitialized: true, //保存本地初始化的session
    secret: 'zfpx', //加密的密钥
    store:new MongoStore({
        url:'mongodb://127.0.0.1/shopping'
    }),//指定会话存储的位置, 可以是数据库(MongoDB) 文件系统  内存(默认值)
    cookie:{
        maxAge:3600*1000
    }//会话有效期,过来这段时间会话终止
}))

app.use('/',index);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/order',orderRouter);

app.listen(3333, () => {
    console.log("localhost:3333/");
});

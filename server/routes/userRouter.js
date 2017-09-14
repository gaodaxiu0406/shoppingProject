let express = require('express');
let router = express.Router();
let {User} = require('../database/model');
let multer=require('multer');//解析文件上传的中间件
// 个人信息
router.get('/myInfo',(req,res)=>{
    console.log('个人信息');
    console.log(req.body);
})
// 注册
// post 请求 需要用'body-parser'
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

let upload=multer({dest:'./userImg'});//上传的头像图片保存到userImg文件夹中
// 上传文件需要在前端页面的form表单中加enctype="multipart/form-data"属性
router.post('/signUp',upload.single('avatar'),(req,res)=>{  
    console.log('注册');
    // console.log('body',req.body);
    console.log(req.file);
    let {username,password,email}=req.body;
    avatar=`${req.file.filename}`;
    User.findOne({username},(err,oldUser)=>{
        if(err){
            res.send( JSON.stringify({code:0,msg:'发生错误!'}));
        }else{
            if(oldUser){
                res.send( JSON.stringify({code:0,msg:'用户名已存在,请换个用户名注册!'}));
            }else{
                User.create({username,password,email,avatar},(err,doc)=>{
                    if (err) {
                        res.send( JSON.stringify({code:0,msg:'服务器错误,请重试!'}));   
                    }else{
                        res.send( JSON.stringify({code:1,msg:'恭喜你注册成功!'})); 
                    }
                })
            }
        }
    })    
})

// 登录
router.post('/logIn',(req,res)=>{
    console.log('登录');
    // console.log('req',req);
    console.log('body',req.body);
    let user=req.body;
    if(!user.username||!user.password ){
        res.send('参数错误');
        return;
    };//判断是不是空对象
    User.findOne(user,(err,oldUser)=>{
        if (err) {
            res.send(JSON.stringify({
                code:0,
                msg:"发生错误!"
            }));
        }else{
            if(oldUser){
                // res.setHeader('Set-Cookie', ['islogin=true']);
                res.send(JSON.stringify({
                    code:1,
                    userInfo:oldUser,
                    msg:"恭喜你登录成功!"
                }));
            }else{
                res.send(JSON.stringify({
                    code:0,
                    msg:"用户名或密码不匹配,登录失败!"
                }));
            }
        }
    })
})
// 注销
router.get('/logOut',(req,res)=>{
    // console.log('注销');
    res.setHeader('Set-Cookie', ['isLogIn=fasle']);
});
module.exports=router;
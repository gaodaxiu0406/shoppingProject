let {Order}=require('./model');
// 查询所有订单信息,并写入json文件
let fs=require('fs');
fs.w
Order.find({},(err,docs)=>{
    if(err){
        console.log(err);
    }else{
        console.log(docs);
        fs.writeFile('./orderInfo.txt',docs,(err,data)=>{
            console.log('success');
        })

    }
})

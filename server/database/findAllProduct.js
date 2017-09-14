let {Product}=require('./model');
// 查询所有用户信息,并写入json文件
let fs=require('fs');
fs.w
Product.find({},(err,docs)=>{
    if(err){
        console.log(err);
    }else{
        console.log(docs);
        fs.writeFile('./productInfo.txt',docs,(err,data)=>{
            console.log('success');
        })

    }
})

let {Product}=require('./model');

// 向数据库写入商品信息
let fs=require('fs');
fs.readFile('./productData.json','utf-8',(err,data)=>{    
    let dataAry=JSON.parse(data);
    dataAry.map((item,index)=>{
        Product.create({
            productName:item.productName,
            spec:item.spec,
            price:item.price,
            sales:item.sales,
            type:item.type,
            describe:item.describe,
            expTime:item.expTime,
            productImg:item.productImg,
        },(err,doc)=>{
            console.log(doc);
        })
    })
});

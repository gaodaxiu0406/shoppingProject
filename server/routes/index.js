let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
    console.log('首页');
    // debugger;
    
    // res.sendFile('../index.html',{root: __dirname});
})
module.exports = router;
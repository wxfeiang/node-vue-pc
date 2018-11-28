const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//users/.js
const users = require("./routes/api/users");


//DB
const db = require("./config/keys").mongoURI;
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log("数据库链接成功"))
    .catch(err => console.log(err))
// Connect to mongodb

// bodyParser 中间件使用
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// 初始化 
app.use(passport.initialize()); 
require("./config/passport")(passport);  // 数据分离

//  根路径
app.get("/", (req, res) => {
    res.send("这里是项目跟路径")
})

app.use("/api/users", users) // 上面引入进来的

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server  running  on prot  ${port}`)
})
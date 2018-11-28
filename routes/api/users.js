//用于登录注册 接口
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar")

// $route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: "loworking "
    })
})
// $route  post api/users/test
// @desc   返回的请求的json数据
// @access public   注册接口 
router.post("/register", (req, res) => {
    // console.log(req.body)  
    // 查询数据库 
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (user) {
            return res.status(400).json({
                email: "邮箱已经被注册!!!"
            })
        } else {
            // 头像地址
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            //存
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar, //  es6一样只写一个
            })
            //  密码加密
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    // 保存
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))

                });
            });


        }
    })
})
// $route  post api/users/login
// @desc   jet tocan
// @access public 登录接口
router.post("/login", (req, res) => {
    // 获取到 
    const email = req.body.email;
    const password = req.body.password;
    // 查询是否存在
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    email: "邮箱不存在!!!"
                })
            }
            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json({ msg: "sucess" })
                    } else {
                        return res.status(400).json({
                            password: "密码错误!!!"
                        })
                    }
                })

        })


})


module.exports = router;
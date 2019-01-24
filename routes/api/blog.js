const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Blog = require("../../models/Blog");
const validateBlogInput = require("../../validation/blog");
// $route  GET api/blog/test
// @desc   返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: "blog works" });
});
// $route  GET api/profile/blog
// @desc   返回的请求的json数据  获取当前登录得用户个人信心
// @access public
router.post("/blog", (req, res) => {
  //console.log(req.body);
  const { errors, isValid } = validateBlogInput(req.body);

  // 判断isValid是否通过
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newBlog = new Blog({
    author: req.body.author,
    content: req.body.content,
    title: req.body.title,
    catrgories: req.body.catrgories.split(",")
  });

  newBlog.save().then(blog => res.json(blog));
});

module.exports = router;

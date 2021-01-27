var express = require('express');
var router = express.Router();

let Article = require('../models/article')
//转化时间格式数据的
// let monent = require('monent')

/* GET home page. */
router.get('/index', async function(req, res, next) {

  let cPage = req.query.page || 1
  console.log(cPage);
  // let userName = req.session.username
  // console.log(userName);
  // let data = await Article.find()
  // console.log(data);
  
  let userName = req.session.username || ''

  let data = {
    blogList:[],//文章列表
    currPage:cPage,//当前页数
    Pagestotle:'',//总页数
  }
  //设定每页渲染的条数
  let pageSize = 4
  //锁定每页显示的数据总条数

  data.blogList = await Article.find()
  .limit(pageSize)//限定展示出来的条数
  .skip((data.currPage - 1) * pageSize)//限定从第几条开始截取
  //总数据
  let blogAll = await Article.find()
  //总页码
  data.Pagestotle = blogAll.length / pageSize
  
  //将所有的时间戳转换成时间
  // data.blogList.map(item =>{
  //   item.date =  moment(item.date).format('MMMM Do YYYY, h:mm:ss a')
  // })


  res.render('index', { userName, data });
});

router.get('/login',function (req, res) {
  let userName = req.session.username || ''
  res.render('login',{userName})
})

router.get('/article',function (req, res) {
  let userName = req.session.username || ''
  res.render('details',{userName})
})

router.get('/regist',function (req, res) {
  let userName = req.session.username || ''
  res.render('regist',{userName})
})

router.get('/write',function (req, res) {
  let userName = req.session.username || ''
  res.render('write',{userName})
})

router.get('/header',function (req, res) {
  let userName = req.session.username
  console.log(userName);
  res.render('header',{userName})
})

module.exports = router;

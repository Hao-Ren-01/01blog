var express = require('express');
var router = express.Router();

let Article = require('../models/article')
//转化时间格式数据的
let moment = require('moment')

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
  data.Pagestotle = Math.ceil(blogAll.length/pageSize)
  // data.Pagestotle = Math.ceil(data.Pagestotle) 
  
  //将所有的时间戳转换成时间
  data.blogList.map(item => {
    item['date']  =  moment(item.date).format('YYYY-MM-DD HH:mm:ss')
    
  })


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

router.get('/write',async function (req, res) {
  let userName = req.session.username || ''

  let _id = req.query._id || ''
  if (_id) {
    let page = req.query.page
  console.log(_id);
  console.log(page);

  //文章数据查询渲染
  let details = await Article.findOne({_id:_id})
  //时间处理
    res.render('write',{userName,details})
  
  } else {
    res.render('write',{userName})
  }




  
})

router.get('/header',function (req, res) {
  let userName = req.session.username
  console.log(userName);
  res.render('header',{userName})
})
router.get('/details',async function (req, res) {
  let userName = req.session.username

  let blokId = req.query._id
  console.log(blokId);

  let data = await Article.findOne({_id:blokId})
  data['date'] = moment(data.date).format('YYYY-MM-DD HH:mm:ss')

  res.render('details',{userName, data})
})

module.exports = router;

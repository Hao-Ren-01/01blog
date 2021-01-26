var express = require('express');
var router = express.Router();

let Article = require('../models/article')

/* GET home page. */
router.get('/index', async function(req, res, next) {
  // let userName = req.session.username
  // console.log(userName);
  let data = await Article.find()
  console.log(data);

  let userName = req.session.username || ''
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

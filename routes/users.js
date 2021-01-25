var express = require('express');
var router = express.Router();


//将用户模板导入
let User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUser', (req, res, next) => {
  console.log(req.body);


  //向数据库添加用户信息
  let userInfo = {
    userName: req.body.userName,
    password: req.body.password,
    passwordC: req.body.passwordC,
  }

  //页面表单数据，放入模型
  let userI = new User(userInfo)

  // const schema = Joi.object({
  //   userName: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
  //   password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
  //   passwordC: Joi.ref('password'),
  // })
  // try {
  //   const value = await schema.validateAsync(userInfo)
  // }
  // catch (err) { 
  //   console.log(err.massage);
  // }
  

  //保存
  userI.save((err, result) => {
    if (!err) {
      res.send(result)
    }
  })
})

//登录-----查询
router.post('/login',(req, res, next) =>{
  //从表单获取数据
  let userinfo = {
    userName: req.body.username,
    password: req.body.password,
  }
  console.log(userinfo);
  User.findOne(userinfo, function (err, result) {
    if (err) {
      return console.log(err)
    }
    if (result == null) {
      console.log('登录失败');
      res.redirect('/regist')
    } else {
      //将用户新消息存储
      req.session.username = userinfo.userName
      console.log('登录成功');
      //路由重定向
      res.redirect('/index')
    }
  })
})


module.exports = router;





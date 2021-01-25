let mongoose = require('../mongodb/db')
//Scheam
let Schema = mongoose.Schema

let articleSchema = new Schema({
    title: String,
    content: String,
    date:String,
})
//Model ------将会生成数据库集合名（复数）
let article = mongoose.model('articles', articleSchema)

module.exports = article

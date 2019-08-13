var express = require('express');
var router = express.Router();

router.get('/list',function (req,res) {
  res.render('parent/parent');
});

router.get('/add', function (req,res) {
  res.render('parent/addparent');
})

module.exports = router;

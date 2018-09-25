var express = require('express');
var router = express.Router();
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req.files[0].path);
    res.json(req.file);
});

module.exports = router;

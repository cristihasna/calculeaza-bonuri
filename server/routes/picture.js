var util = require('util');
var express = require('express');
var router = express.Router();
var multer = require('multer'); // v1.0.5
var storage = multer.memoryStorage();
var upload = multer({storage}); // for parsing multipart/form-data
var path = require('path');
var Tesseract = require('tesseract.js');

var tesseract = Tesseract.create({
    workerPath : path.join(__dirname, '../tesseract/src/node/worker.js'),
    langPath: path.join(__dirname, '../tesseract/langs'),
    corePath: path.join(__dirname, '../tesseract/src/index.js')
});

/* GET users listing. */
router.post('/', upload.single('file'), function(req, res, next) {
    console.log(req.file);
    tesseract.recognize(req.file.buffer, {
        lang: 'eng'
    })
    .progress(msg => {
        console.log(msg);
    })
    .then((data) => {
        res.json({lines: data.lines[0].text})
    })
    .catch(err => res.json({err:err}))
});

module.exports = router;

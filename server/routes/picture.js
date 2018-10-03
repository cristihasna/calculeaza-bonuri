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

var extractLinesFromData = (linesObject) => {
    let lines = [];
    for(let line of linesObject){
        let words = []
        for(let word of line.words)
            words.push(word.text);
        lines.push({confidence: line.confidence, text:line.text, words});
    }
    return lines;
}

var extractProductsFromLines = (lines) => {
    let products = [];
    let priceRegex = /[0-9]+\.[0-9]{2,}/;
    let nameRegex = /^[a-zA-Z]+/;
    for(let i = 0; i < lines.length; i++){
        let line = lines[i];
        if(line.confidence > 50 && priceRegex.test(line.text)){
            line.price = '0.00';
            for(let i = line.words.length - 1; i >= 0; i--){
                if(priceRegex.test(line.words[i])){
                    line.price = line.words[i];
                    break;
                }
            }
            if(nameRegex.test(line.text))
                line.name = line.words[0];
            else if(i > 0 && nameRegex.test(lines[i-1].text))
                line.name = lines[i-1].words[0];
            else 
                line.name = 'produs'; 

            products.push(line);
        }
    }
    return products;
}

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
        res.json({
            lines: extractLinesFromData(data.lines),
            text: data.text,
            products: extractProductsFromLines(extractLinesFromData(data.lines))
        })
    })
    .catch(err => res.json({err:err}))
});

module.exports = router;
